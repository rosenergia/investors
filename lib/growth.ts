// Each chapter also supplies one inner ring and its three connected topics.
export const references = {
  demand: [
    "CBI · Avrupa iş kıyafeti pazarı",
    "https://www.cbi.eu/market-information/apparel/workwear/market-potential",
  ],
  rail: [
    "Koper Limanı · Demiryolu bağlantıları",
    "https://www.luka-kp.si/en/services-terminals/port-connections/railway-connections/",
  ],
  eu: [
    "Avrupa Birliği · Slovenya ülke profili",
    "https://european-union.europa.eu/principles-countries-history/eu-countries/slovenia_en",
  ],
  spot: [
    "SPOT Slovenya · Limited şirket kuruluşu",
    "https://spot.gov.si/en/info/company-registration/limited-liability-company-d-o-o",
  ],
  credit: [
    "SID Bank · Finansman kanalları ve koşullar",
    "https://www.sid.si/en/financing",
  ],
  label: [
    "Your Europe · Tekstil ürünlerinin etiketlenmesi",
    "https://europa.eu/youreurope/business/product-rules-compliance/textiles-and-footwear/textile-label/index_en.htm",
  ],
  customs: [
    "AB Türkiye Delegasyonu · Gümrük Birliği kapsamı",
    "https://www.eeas.europa.eu/delegations/t%C3%BCrkiye/customs-union_en",
  ],
  vat: [
    "Your Europe · Sınır ötesi KDV işlemleri",
    "https://europa.eu/youreurope/business/finance-and-tax/vat/cross-border-vat/",
  ],
} as const;
type Ref = keyof typeof references;
type Theme = [string, string, string, string];
type Chapter = {
  theme: Theme;
  title: string;
  body: string[];
  actions: [string, string, string];
  refs: Ref[];
};
export type Dossier = {
  headline: string;
  opening: string;
  buyer: string;
  deliverable: string;
  pilot: [string, string, string];
  chapters: Chapter[];
};
function section(
  theme: Theme,
  title: string,
  body: string[],
  actions: [string, string, string],
  refs: Ref[] = [],
): Chapter {
  return { theme, title, body, actions, refs };
}

export const growth: Record<string, Dossier> = {
  tekstil: {
    headline: "Avrupa’daki müşterinin ikinci siparişini kazanmak",
    opening:
      "Bir otel zinciri sezon başında personel kıyafetini toplu alabilir. Altı hafta sonra yeni çalışanları için yalnızca on iki pantolon istediğinde satın alma kararı değişir. Aynı kumaşı, aynı renk tonunu ve eksilen bedenleri vardiya başlamadan teslim edebilen üretici, ilk siparişi yıllık bir tedarik ilişkisine çevirebilir. Viyana, Zagreb veya Milano’daki alıcı için doğru ikmal noktasını bulmak, bu küçük siparişi kazanıp kazanamayacağınızı belirler.",
    buyer:
      "İş kıyafeti distribütörleri, otel grupları, özel markalı perakende zincirleri ve tekrar alım yapan butik ağları.",
    deliverable:
      "Türkiye’de ana üretim, hızlı dönen bedenlerde alıcıya yakın bir depodan ikmal ve yerel iade kabulü için birim maliyeti görülebilen bir teklif.",
    pilot: [
      "Bir iş kıyafeti distribütörüyle tek model ve iki renk seçin. Son sekiz haftanın beden bazlı satışını ve yetişmeyen taleplerini anonim olarak çıkarın. Alıcının kabul edeceği teslim süresini yazılı hale getirin.",
      "İki taşıyıcıdan aynı teslim adreslerine fiyat, bir depodan giriş, raf, toplama, paketleme ve iade tarifesi alın. İlk siparişi fabrikadan gönderin. Yalnız sık eksilen bedenleri bölgesel stokta deneyin.",
      "Bir ikmal dönemi sonunda zamanında ve tam teslimi, bedeni bulunamadığı için kaçan siparişleri, dönüş kargosunu ve nakde dönüş gününü karşılaştırın. Dönem katkısı pozitifse ve alıcı ikinci siparişini verdiyse stok kapsamını genişletin.",
    ],
    chapters: [
      section(
        ["Pazar seçimi", "İş kıyafeti", "Özel marka", "Alıcı kanalı"],
        "Orta Avrupa’ya ürün ailesi ve alıcı tipiyle girin",
        [
          "Aynı polo tişörtün bir kurumsal giyim distribütörüne ve bir moda zincirine sunduğu değer farklıdır. Distribütör yıl boyunca aynı lacivert tonu ve beden serisini arar. Moda zinciri, koleksiyonun hangi renginin sattığını gördükten sonra kısa bir süre içinde takviye ister. İlkinde devamlılık, ikincisinde sipariş kararını erteleyebilme imkânı fiyat görüşmesinin önemli parçasıdır.",
          "CBI’nin Eurostat verilerine dayanan çalışmasına göre Avrupa’nın iş kıyafeti ithalatı 2024’te yaklaşık 3,4 milyar avroydu. Almanya bu ürün grubunda AB’nin en büyük ithalat pazarıydı. Bu rakam yalnız iş kıyafetini kapsar. Türk üreticisi için uygulanabilir başlangıç, bu büyük pazarın tamamını hedeflemek yerine düzenli ürün yenileyen bir distribütörün belirli bir müşteri grubuna girmektir.",
          "Örneğin Graz çevresinde otellere kıyafet sağlayan bir dağıtıcı için teklifi çalışan başına set olarak yazın. Beden değişiminin kaç adım sürdüğü, yıpranan tek parçanın yeniden alınabilmesi ve sezon içinde renk devamlılığı, satın almacının mevcut tedarikçiden geçiş kararını somutlaştırır. Bu alıcıya hizmet verecek bölgesel operasyonu ancak bu hizmete düzenli talep oluştuğunda ölçeklendirin.",
        ],
        [
          "Kurumsal giyimde aynı modelin sezonlar arası bulunabilirliğini ve beden tamamlama hizmetini fiyatlayın.",
          "Özel markada alıcı onaylı kalıp, kumaş reçetesi ve renk standardını ana siparişten sonraki partilere taşıyın.",
          "Bir şehir kümesi ve bir alıcı tipi seçin. İlk kanalı aktif hesap, ikinci sipariş ve sipariş başına katkıyla değerlendirin.",
        ],
        ["demand"],
      ),
      section(
        ["Lojistik", "Ana taşıma", "Bölge deposu", "Son kilometre"],
        "Uzun mesafeyi toplu geçin, son teslimi siparişin ritmine uydurun",
        [
          "Bursa’dan çıkacak tam parti, teslim tarihi haftalar öncesinden bilinen tek alıcıya gidiyorsa doğrudan araç en verimli seçenek olabilir. Aynı üretimin Viyana, Graz ve kuzey İtalya’daki mağazalara farklı günlerde ve az sayıda dağıtılması gerektiğinde maliyetin yapısı değişir. Bir ana taşıma ile sözleşmeli depoya inip oradan küçük sevkiyatlar çıkarmak, her eksik beden için ayrı uluslararası gönderi ihtiyacını azaltabilir. Depo adaylarını müşteri adreslerine göre seçin. Örneğin Trieste ve Graz’a dağıtım için Ljubljana ve kuzey İtalya’dan, Budapeşte ve Zagreb’e dağıtım için Macaristan ve Hırvatistan’dan aynı koli listesine fiyat alın.",
          "Taşıma hesabına araç ücretinin yanında randevu beklemesini, koli kabulünü, palet açmayı, barkod okutmayı, mağaza bazında ayırmayı, son teslimi ve başarısız teslimin ikinci çıkışını yazın. Üç mağazaya altı ayrı teslimat ile tek depoya bir teslimat aynı hizmet değildir. Her teklifi aynı mağaza listesi, koli ağırlığı ve haftalık çıkış takvimiyle alın.",
          "Koper Limanı işletmesi Graz, Budapeşte ve başka iç terminallere demiryolu bağlantıları yayımlar. Bu ağ, denizyoluna uygun hacim veya farklı ülkelerden birleştirilecek girdiler olduğunda incelenebilir. Türkiye çıkışlı küçük bir hazır giyim partisinde karayolu, parsiyel taşıma ve gerektiğinde ekspres gönderi için ayrıca kapıdan kapıya süre alın. Aktarmanın ve depoda beklemenin toplam süreye etkisini teslim kayıtlarıyla ölçün.",
        ],
        [
          "Tam araç, parsiyel ve toplu konsolidasyon tekliflerini aynı teslim noktası ve yükleme günüyle karşılaştırın.",
          "Depo teklifinde koli kabulü, stok sayımı, sipariş toplama ve aylık asgari ücretin ayrı satırlarda olmasını isteyin.",
          "Gönderinin depodan çıktığı saati ve alıcının teslim aldığı saati kaydedin. Alıcının hizmeti bu iki zamanın farkıyla ölçülür.",
        ],
        ["rail"],
      ),
      section(
        ["Dağıtım", "Beden stoku", "Mağaza ikmali", "İade döngüsü"],
        "Stoku en çok aranan bedene yerleştirin",
        [
          "Bölge deposunda bütün koleksiyonu tutmak, yavaş dönen renk ve bedenlerin riskini üreticiye yükler. Ana üretim Türkiye’de kalırken son satış verisinde sık tükenen bedenleri küçük bir ikmal stokuna ayırmak daha kontrollü bir başlangıçtır. Mağaza, sezon başında tüm talebi tahmin etmek zorunda kalmadan düzenli tamamlama siparişi verebilir.",
          "Bir kot pantolonun üç boy ve altı beden seçeneği, tek renk için on sekiz ayrı stok kalemi oluşturur. Pilot sırasında hızlı satan birkaç kalemi depoya ayırın. Diğerlerini fabrikadan planlı terminle sunun. Her kalem için minimum stok ve yeniden sipariş eşiği belirleyin. Ayrılmış ürünün mülkiyetini, alıcının rezervasyon süresini ve sezon sonunda kalanın kime ait olduğunu sözleşmede yazın.",
          "İade kabulünü de dağıtımın parçası yapın. Yanlış beden, dikiş kusuru ve kullanılmamış sezon sonu ürünü aynı işlemden geçmez. Yerel kabul noktası orijinal etiketi kontrol edebilir, değişim ürününü ayırabilir ve yeniden satılabilir parçayı stoka döndürebilir. Faydası, dönüş kargosunun yanı sıra şikâyetten çözüm tarihine kadar geçen gün ve geri kazanılan satış değeriyle görünür.",
        ],
        [
          "Sekiz haftalık satıştan beden başına talebi çıkarın. Kıtlığı sürekli olan bedeni ve elde kalan bedeni aynı ortalamada birleştirmeyin.",
          "Mağazaya gerçek stok, sipariş kesim saati ve bir sonraki sevk gününü gösterin. Hizmet sözünü taşıyıcı kapasitesiyle eşleştirin.",
          "Her iade için neden, geri kazanılan ürün değeri, yeniden paketleme gideri ve kapanış tarihi tutun.",
        ],
      ),
      section(
        ["İş kurma", "Hizmet ortağı", "Yerel şirket", "İthalat düzeni"],
        "Önce hizmeti kurun, hacim oluşunca şirket kararını verin",
        [
          "Pazarı denemek için ilk adım sözleşmeli lojistik hizmeti olabilir. Üretici teklif ve kalite ilişkisini yönetir, lojistik ortağı üzerinde mutabık kalınan işleri yapar. Toptancı modeli ise stok riskini ve satış faaliyetini alıcıya devredebilir, karşılığında dağıtıcı marjı doğar. Doğrudan satışta sorumluluk ve sermaye ihtiyacı üreticide kalır. Bu üç düzen için aynı sipariş üzerinden kimin fatura keseceğini, kimin tahsil edeceğini ve iadenin kime döneceğini çizin.",
          "Ülkeye göre kuruluş koşullarını ayrı inceleyin. Örneğin Slovenya AB üyesidir ve avro kullanır. SPOT’a göre Sloven d.o.o. şirketinde asgari esas sermaye 7.500 avrodur. Bu tutarı kuruluş harcı gibi giderleştirmek hesabı bozar. Basit kuruluş yolunun uygulanabilirliği kurucunun durumuna ve kuruluş belgelerine bağlıdır. Düzenli siparişler yerel satış, personel ve garanti yönetiminin sabit yükünü karşılayacak düzeye geldiğinde şirket seçeneğini ayrıca fiyatlayın.",
          "Türk hazır giyimini Slovenya’ya ithal edip başka bir AB ülkesine sevk ederken ürün kodu, serbest dolaşım durumu, ithalatçı, stok sahibi ve satış şekli belge akışını etkiler. AB–Türkiye Gümrük Birliği sanayi ürünlerini kapsar. İthalat KDV’si ve sonraki teslimlerin bildirimi ayrı konulardır. Tek bir tişört kodu ve gerçek işlem zinciri için müşavirden yazılı iş akışı alın. Depo sözleşmesine kimin ithalatçı olacağını açıkça yazın.",
        ],
        [
          "Hizmet sözleşmesinde teslim kesim saati, sayım farkı, hasar, iade ve sigorta sorumlularını adlandırın.",
          "Muhasebe, banka, yerel yönetim ve personel giderlerini yıllık sipariş hacmine bölün. Avro tahsilat ile Türkiye’deki maliyetin kur riskini ayrı izleyin.",
          "Türkiye çıkışı, Slovenya’da ithal ve Avusturya’ya B2B teslim için aynı ürün kodunda örnek belge ve KDV akışı hazırlatın.",
        ],
        ["eu", "spot", "customs", "vat"],
      ),
      section(
        ["Marka güveni", "Numune", "İzlenebilirlik", "Yerel muhatap"],
        "Alıcının sizi tekrar siparişe davet etmesini sağlayın",
        [
          "Satın almacının riski ilk numuneyi beğenmekle bitmez. Seri malda kumaşın çekmesi, renk tonunun partiden partiye değişmesi veya yanlış bedenin geri gönderilememesi, markayı mağazanın önünde zor durumda bırakır. Yerel temas noktasının değeri, sorun çıktığında hangi partinin etkilendiğini bulabilmesi ve alıcıya net bir değişim günü verebilmesidir.",
          "Sunumu buna göre hazırlayın. Bir ürün ailesinde onaylı numuneyi, ölçü toleransını, yıkama sonrası ölçümü, parti numarasını ve iade sorumlusunu aynı ürün dosyasına koyun. Numune setini bölgedeki satış temsilcisine emanet etmek, karar vericinin kumaşı görmesine ve benzer ürünlerle aynı toplantıda karşılaştırmasına imkân verir. Temsilcinin yetkisi, numune bedeli ve geri alma koşulları teklifte görünmelidir.",
          "AB tekstil etiketleme kuralları elyaf bileşiminin belirtilmesini ve tüketiciye sunulan pazarda gereken dil bilgilerinin karşılanmasını öngörür. Almanca ve İtalyanca satış için baskı öncesi ayrı onay alın. Türk üretimini açıkça belirtip Avrupa’daki dağıtım ve satış sonrası hizmeti hangi ortağın yürüteceğini anlatın. Güveni güçlendirecek referans, pilot alıcının izin verdiği teslim performansı ve çözülen iadelerin kaydıdır.",
        ],
        [
          "Onaylı numuneyi tarih ve revizyonla arşivleyin. Üretim partisini aynı referansla kabul edin.",
          "Etiketteki elyaf bilgisi, parti kodu ve ürün dosyasını birbirine bağlayın. Her hedef pazarın dil gereğini etiket baskısından önce doğrulayın.",
          "İtirazı alacak kişiyi, ilk yanıt süresini ve değişim sevkinin kim tarafından onaylanacağını alıcıya yazılı verin.",
        ],
        ["label"],
      ),
      section(
        [
          "Finansman",
          "İşletme sermayesi",
          "Alacak finansmanı",
          "Banka dosyası",
        ],
        "Avrupa’da krediye erişimi siparişin nakit döngüsüyle planlayın",
        [
          "İplik ve kumaş peşin, mağaza ödemesi vadeli ise kârlı bir sipariş dahi nakit açığı yaratabilir. Bölgesel stok buna depoda geçen günleri ekler. Örneğin birim maliyeti 9 avro olan 300 parçanın raftaki alış değeri 2.700 avrodur. Bu tutar bağlanan sermayedir. Dönem gideri olarak depo ücretini, finansman maliyetini ve satılamayan ürün değer kaybını ayrıca hesaba katın.",
          "Avro cinsinden, düzenli faturalandırılan ve teslimi kanıtlanabilen siparişler bankaya veya finansman kuruluşuna sunulacak bir işlem geçmişi oluşturabilir. İşletme kredisi stok ile tahsilat arasındaki süreyi, alacak finansmanı ise doğmuş faturanın vadeye kadar geçen bölümünü hedefler. Tek müşteriye bağımlılık, faturaya itiraz ve iade hakkı limit görüşmesini etkileyebilir. Faktoring teklifinde avans oranını, komisyonu ve alıcı ödemezse riskin kime döndüğünü birlikte okuyun.",
          "Slovenya örneğinde SID Bank, ticari bankalar üzerinden finansman kanallarını ve belirli koşullarda doğrudan finansmanı açıklar. Kuruluş tarihi, faaliyet, finansal geçmiş, teminat ve kullanım amacı bakımından uygunluk ilgili ürün ve bankayla teyit edilmelidir. Yeni bir Sloven şirketine açılış günü limit tanınacağı varsayımıyla stok alınmamalı. Pilotun ilk nakit planını mevcut özkaynak veya yazılı limit üzerinden kurun.",
          "Karar için Türkiye’deki mevcut kredi teklifini, hedef ülkede başvuracağınız işletme limitini ve alıcı avansını aynı avro ihtiyacı ve aynı gün sayısıyla yan yana koyun. Faiz, tahsis ücreti, teminat maliyeti, kur dönüşümü ve kullanılmayan limit ücretini dahil edin. Alıcı vadesi uzadığında ek satışın marjı finansman maliyetine gidiyorsa yerel stok miktarını azaltın veya alıcıdan stok rezervasyon bedeli isteyin.",
        ],
        [
          "Üretime ilk ödemeden müşterinin tahsilat gününe kadar haftalık nakit tablosu çıkarın. En yüksek açık gerekli limit için ilk ölçüdür.",
          "İtirazsız faturayı, imzalı teslim kaydını ve iade koşulunu finansman sağlayıcısına birlikte sunun.",
          "Banka görüşmesine sipariş geçmişi, alıcı yoğunlaşması, nakit akışı ve teminat listesiyle gidin. Yazılı limit ve toplam maliyet alın.",
        ],
        ["credit"],
      ),
    ],
  },
  celik: {
    headline: "Proje sahibine montajı planlanmış bir çelik paket sunmak",
    opening:
      "Bir genel yüklenici için çeliğin ton fiyatı teklifin yalnızca bir bölümüdür. Kirişler vinç penceresine yetişmediğinde şantiye ekibi bekler. Türkiye’deki imalatı Avusturya’daki bir şantiye veya Hırvatistan’daki bir depo projesi için adres bazında fiyatlanmış sevkiyat ve sözleşmeli montajla birleştiren teklif, alıcının bu riski önceden fiyatlamasını sağlayabilir.",
    buyer:
      "Avusturya ve kuzey İtalya’da çalışan genel yükleniciler, endüstriyel tesis sahipleri ve montaj firmaları.",
    deliverable:
      "Tek metraj için teslim sırası, montaj kapsamı ve hakediş planı belli bir teklif.",
    pilot: [
      "Tek bir aks veya yapı bölümüne ait onaylı çizim ve anonim metraj alın.",
      "Türkiye’den şantiyeye doğrudan teslim ile bir ara sahadan montaj sırasına göre sevki aynı kaldırma planında fiyatlayın.",
      "Ton başına katkıyı, bekleyen vinç saatini ve eksiksiz sevk edilen bağlantı parçalarını karşılaştırın.",
    ],
    chapters: [
      section(
        ["Alıcı kanalı", "Ana yüklenici", "Montaj firması", "Teklif listesi"],
        "İhale öncesi teknik masaya girin",
        [
          "Yerel proje ve montaj firması, hangi paketlerin dışarıdan alınacağını teklif aşamasında görebilir. Üreticinin kapasitesini örnek bir imalat dosyasıyla bu ekibe tanıtmak, fiyat istendiği anda çizim revizyonunu ve teslim sorumluluğunu konuşabilmesini sağlar.",
        ],
        [
          "Yükleniciye bir aksın teslim dosyasını gösterin.",
          "Ortaktan saha yeterliliğini ve ekip takvimini isteyin.",
          "İlk teklifte karar tarihi ve teknik onay kişisini kaydedin.",
        ],
      ),
      section(
        ["Sevkiyat", "Yükleme planı", "Ara saha", "Vinç sırası"],
        "Ton taşımakla montaj sırasını teslim etmek arasındaki farkı fiyatlayın",
        [
          "Uzun parçayı ara depoya iki kez indirmenin maliyeti yükselebilir. Şantiye kabul tarihleri kesinse fabrikadan direkt sevk edin. Dar sahada aynı gün yalnızca belirli aks kurulabiliyorsa yakın ara saha, malzemeyi vinç sırasına göre çağırma imkânı verebilir.",
        ],
        [
          "Araç ölçüsünü ve yük sabitlemeyi taşıyıcıya teyit ettirin.",
          "Ara indirme, bekleme ve hasar riskini ayrı ücretlendirin.",
          "Sevk sırasını montaj ekibinin günlük kaldırma listesine bağlayın.",
        ],
      ),
      section(
        ["Teklif kapsamı", "Metraj", "Revizyon", "Montaj"],
        "Alıcının iki teklifi aynı kapsamda okuyabilmesini sağlayın",
        [
          "Ucuz görünen bir teklif, boya, ankraj veya kaldırma ekipmanını dışarıda bırakmış olabilir. Teklif eki olarak bir sorumluluk çizelgesi verin. Projenin ülkesindeki ticari muhatap, değişiklikleri saha dilinde toplayıp üretime onaylı tek revizyon gönderebiliyorsa yeniden imalat riski azalır.",
        ],
        [
          "Tonajı aynı çizim revizyonunda sabitleyin.",
          "Revizyonun fiyat ve termin etkisine yazılı onay alın.",
          "Montaj, vinç ve saha erişiminden sorumlu tarafı belirtin.",
        ],
      ),
      section(
        ["Güven", "Kalite dosyası", "Referans", "Kabul"],
        "İşverenin denetleyebileceği bir teslim zinciri kurun",
        [
          "Bir yerel adresin satış değeri, kalite kayıtlarını bulabilen ve eksik parçanın düzeltmesini yönetebilen bir ekiple oluşur. Teklif talebindeki gereklilikleri iş bazında inceleyip kaynak, malzeme ve kaplama kayıtlarını parça numarasına bağlayın.",
        ],
        [
          "Alıcının kalite belgesi listesini teklife ekleyin.",
          "İzinli benzer iş referansı gösterin.",
          "Sahada eksik bildiriminin kapanma süresini izleyin.",
        ],
      ),
      section(
        ["İş modeli", "Temsil", "Sözleşme", "Saha ortağı"],
        "İmalat, satış ve montaj gelirlerini ayırın",
        [
          "Yerel ortak yalnızca müşteri buluyorsa satış komisyonu; ekip sağlıyor ve teslim sorumluluğu alıyorsa kapsamlı hizmet bedeli anlamlıdır. Bir pilot projeyle bu rolleri tartın. Tekrarlanan projeler yerel şirketin sabit giderini taşıyacak düzeye gelince kalıcı yapı düşünülebilir.",
        ],
        [
          "Teklif verme yetkisini yazılı belirleyin.",
          "Gecikme ve değişiklik hükümlerini üretim sözleşmesiyle eşleştirin.",
          "Saha ekibinin iş programını ve sigorta kapsamını doğrulayın.",
        ],
      ),
      section(
        ["Nakit akışı", "Avans", "Hakediş", "Teminat"],
        "Çelik alımı ile saha kabulü arasındaki açığı yönetin",
        [
          "Malzeme siparişi başta, son ödeme montaj kabulünde ise iş büyüdükçe nakit ihtiyacı artar. Avans, imalat kontrolü, sevk ve kabul için ayrı ödeme dilimleri isteyin. Bankadan gelen teminat mektubu veya kredi teklifinin limit tüketimini proje katkısına dahil edin.",
        ],
        [
          "Malzeme siparişini avans tarihine bağlayın.",
          "Hakediş ölçüsünü geçerli çizimle tanımlayın.",
          "Teminat vadesini, komisyonu ve serbest bırakma koşulunu fiyatlayın.",
        ],
        ["credit"],
      ),
    ],
  },
  gida: {
    headline: "Alıcıya daha çok satılabilir palet ulaştırmak",
    opening:
      "Bir palet ürünü ucuza taşımak ile perakendecinin rafına kabul edilebilir ömürle ulaştırmak iki farklı sonuç verir. Örneğin Zagreb veya Budapeşte çevresindeki bir aktarma noktasında parsiyel yükleri birleştirmek ancak daha fazla sağlam ürün satılıyor, teslim penceresine uyuluyor ve kalan raf ömrü korunuyorsa değer yaratır.",
    buyer:
      "Toptancı halleri, bölgesel gıda distribütörleri, otel tedarikçileri ve perakende dağıtım merkezleri.",
    deliverable:
      "Tek ürün için sıcaklık kaydı, kabul edilen palet maliyeti ve haftalık dağıtım takvimi.",
    pilot: [
      "Bir ürün, bir hasat dönemi ve iki teslim noktası seçin.",
      "Doğrudan araçla sevk ve alıcının dağıtım hattında soğuk aktarma için aynı sıcaklık ve kabul koşuluyla teklif alın.",
      "Sağlam teslim edilen palet başına maliyet, ret oranı ve teslimde kalan raf ömrüyle sonucu değerlendirin.",
    ],
    chapters: [
      section(
        ["Pazar kanalı", "Toptancı", "Perakende", "Sezon"],
        "Satış takvimini hasat ve raf talebiyle buluşturun",
        [
          "Bölgesel toptancı küçük partileri farklı müşterilere bölebilir. Perakende dağıtım merkezi ise belli gün ve saatte standart palet isteyebilir. Aynı ürünü iki kanala teklif ederken hacim, ambalaj ve iade riskini ayrı yazın.",
        ],
        [
          "Toptancının haftalık çekişini alın.",
          "Zincirin kabul penceresini fiyatlayın.",
          "Hasat zirvesini müşteri promosyon takvimiyle eşleştirin.",
        ],
      ),
      section(
        ["Soğuk taşıma", "Ön soğutma", "Aktarma", "Sıcaklık kaydı"],
        "Aktarmanın süre kazancını ürünün ömrüyle tartın",
        [
          "Birkaç küçük alıcıya tek ana taşıma kullanmak aracı doldurabilir. Soğuk zincir kırılır veya aktarma uzarsa kazanılan navlun indirimi fireye dönüşür. Doğrudan ve bölgesel rotanın ikisini de çıkıştan kabul anına kadar kaydedin.",
        ],
        [
          "Yüklemede ürün sıcaklığını ölçün.",
          "Aktarma süresine yazılı sınır koyun.",
          "Parti kaydını palet etiketiyle eşleştirin.",
        ],
      ),
      section(
        ["Dağıtım", "Sipariş birleştirme", "Raf ömrü", "Son teslim"],
        "Depoyu hızlı dönen bir dağıtım noktası olarak tasarlayın",
        [
          "Sözleşmeli soğuk alanda depolama, küçük alıcıların siparişlerini ortak bir çıkış gününde birleştirebilir. Son kullanma veya hasat tarihine göre çıkış planı yapın. Bekleme gününün satış değerini nasıl değiştirdiğini ürün bazında izleyin.",
        ],
        [
          "Haftalık bölge rotası oluşturun.",
          "Alıcının kabul ettiği kalan ömrü tanımlayın.",
          "Kaçırılan randevunun ikinci teslim giderini ekleyin.",
        ],
      ),
      section(
        ["Marka güveni", "Parti takibi", "Kabul kaydı", "Şikâyet"],
        "Perakendeciye sorunlu partiyi ayırabilecek kayıt sunun",
        [
          "Alıcı bir kasada kusur gördüğünde tüm sevki durdurmak isteyebilir. Üretici, partiye bağlı sıcaklık ve kabul kayıtlarını tek muhataptan sunarsa incelemeyi hızlandırabilir. Bunu pilotta ölçülen şikâyet kapanış süresiyle gösterin.",
        ],
        [
          "Partiyi üretim noktasına bağlayın.",
          "Teslim fotoğrafı ve kabul tutanağı alın.",
          "Ret sebebi ile yeniden satış değerini kaydedin.",
        ],
      ),
      section(
        ["Yerel işleyiş", "Depo ortağı", "Ürün şartı", "Sorumluluk"],
        "Depoya yatırım yapmadan önce talebi kiralanmış kapasitede sınayın",
        [
          "Yoğun sezonda birkaç hafta dolan depo yılın geri kalanında gider üretir. Önce ürünün sıcaklık aralığına uygun bir işletmeden hizmet alın. Ürün türü ve menşeine bağlı ithalat ve kontrol belgeleri için sevkten önce işlem bazında teyit isteyin.",
        ],
        [
          "Depo kapasitesi ve sıcaklık aralığını doğrulayın.",
          "Ürün dosyasını gümrük uzmanına iletin.",
          "Kabulden sonraki hasarın sorumlusunu belirtin.",
        ],
      ),
      section(
        ["Finansman", "Peşin alım", "Fire karşılığı", "Hacim taahhüdü"],
        "Kredi ihtiyacını sağlam satılan ürün üzerinden hesaplayın",
        [
          "Sezonda ürüne peşin ödeme, taşıma, depolama ve vadeli satış aynı anda finansman gerektirir. Bozulan ürünün faturaya dönüşmeyeceğini nakit planına ekleyin. Kalıcı tesis için aylık yazılı hacim, hibesiz işletme sonucu ve sezon dışı doluluk birlikte incelenmelidir.",
        ],
        [
          "Üretici avansını haftalık planlayın.",
          "Ret ve iskonto için olumsuz senaryo çalışın.",
          "Yatırım öncesi aylık asgari hacmi sözleşmeye bağlayın.",
        ],
      ),
    ],
  },
  makine: {
    headline: "Kurulu hattın ömrü boyunca müşterinin tedarikçisi olmak",
    opening:
      "Bir makine yatırımında alıcı, kurulum gününden sonra üretimi kimin ayakta tutacağını da satın alır. Türkiye’de mühendislik ve imalatı koruyup örneğin Çekya ve Almanya’daki alıcılara hizmet veren bir entegratörle devreye alma, yedek parça ve saha desteği organize etmek, uzun vadeli bakım ve kapasite artışı işlerine kapı açabilir.",
    buyer:
      "Orta Avrupa’daki hat entegratörleri, otomotiv yan sanayisi ve seri üretim tesislerinin teknik satın alma ekipleri.",
    deliverable:
      "Bir ekipman için kabul kriteri, müdahale kapsamı ve yedek parça planı içeren ticari teklif.",
    pilot: [
      "Bir üretim hattındaki tek modül ve doğrulanabilir bir darboğaz seçin.",
      "Doğrudan mühendis seyahati ile sözleşmeli bölgesel servis maliyetlerini aynı müdahale kapsamıyla fiyatlayın.",
      "Kabul edilen çevrim süresini, devreye alma günlerini ve ilk servis çağrısında çözüm oranını izleyin.",
    ],
    chapters: [
      section(
        ["Pazara giriş", "Entegratör", "Üretim tesisi", "Darboğaz"],
        "Makineyi hat üzerindeki ekonomik etkisiyle satın",
        [
          "Yerel entegratör, hangi süreçte kapasite kaybı yaşandığını görebilir. Teklifinizi motor gücü listesinden önce, alıcının tanıdığı bir darboğaz ve ölçülebilir iyileşme ile açın. Türkiye’deki mühendislik ekibinin uzaktan çözeceği işleri ayrıca tanımlayın.",
        ],
        [
          "Entegratörün mevcut hat ailesini öğrenin.",
          "Teknik satın alma ile üretim sorumlusunu aynı kabul hedefinde buluşturun.",
          "Mevcut çevrim süresini ölçün.",
        ],
      ),
      section(
        ["Teslimat", "Modüler sevk", "Saha randevusu", "Kaldırma"],
        "Kurulumu sevkiyat programına dahil edin",
        [
          "Tam makinenin depoda beklemesi pahalıdır. Büyük gövdeyi direkt tesise gönderirken sarf ve hassas parçaları kurulum ekibine yakın tutmak gecikme ihtimalini azaltabilir. Yerel stok kararını parçanın değeri ile hattı bekletme maliyetini birlikte düşünerek verin.",
        ],
        [
          "Modüllere göre yükleme listesi çıkarın.",
          "Teknisyen gününü teslim randevusuna bağlayın.",
          "Vinç ve saha erişimini yazılı teyit edin.",
        ],
      ),
      section(
        ["Servis ağı", "Yedek parça", "Yerel ekip", "Müdahale"],
        "Satın alma kararındaki servis riskini görünür kılın",
        [
          "Bölgede eğitimli bir teknisyenin hazır bulunması, üreticinin her arıza için mühendis göndermesiyle karşılaştırılabilir. Servis sözünü ancak beceri, vardiya ve parça stoku doğrulanmış bir ortakla verin.",
        ],
        [
          "Arıza geçmişinden kritik parça sepeti seçin.",
          "Ortağın yetkinliğini pilot müdahaleyle doğrulayın.",
          "Çağrıdan üretimin yeniden başlamasına kadar geçen süreyi ölçün.",
        ],
      ),
      section(
        ["Alıcı güveni", "Kabul testi", "Eğitim", "Referans"],
        "İlk kurulumu ikinci tesisin referansına dönüştürün",
        [
          "Aynı tesiste imzalanan kabul protokolü ve kayıtlı eğitim, alıcının grup içindeki başka fabrikalara üreticiyi önermesini kolaylaştırabilir. Referans kullanım iznini sözleşmede isteyin.",
        ],
        [
          "Test ürününü teklifte sabitleyin.",
          "Operatör eğitimini katılım kaydıyla kapatın.",
          "Önce ve sonra verisini alıcının izniyle paylaşın.",
        ],
      ),
      section(
        ["İşletme", "Proje yönetimi", "Yetki", "Bakım geliri"],
        "Yerel ekibi tekrar eden hizmet geliriyle büyütün",
        [
          "Bir satış projesi kalıcı ofisin giderlerini karşılamayabilir. Bakım sözleşmeleri, uzaktan destek ve eğitim talepleri tekrar ettikçe yerel personel planı daha öngörülebilir hale gelir. Satış, servis ve lisans sorumluluklarını açıkça ayırın.",
        ],
        [
          "Haftalık saha takvimini tek sorumluda toplayın.",
          "Garantide ücretsiz iş ile ücretli değişikliği ayırın.",
          "Sözleşmeli bakımın brüt katkısını hesaplayın.",
        ],
      ),
      section(
        ["Finansman", "Avans", "Kabul ödemesi", "Nakit açığı"],
        "Uzun imalat süresini aşamalı ödemeye bağlayın",
        [
          "Parçalar sipariş edildiğinde sermaye bağlanır, son taksit performans kabulüne kalabilir. Alıcı finansmanı, tedarikçi kredisi ve banka limitini proje para birimi ve aynı vade üzerinden karşılaştırın.",
        ],
        [
          "Avansı tedarik siparişiyle eşleştirin.",
          "Kabul ödemesini objektif ölçüme bağlayın.",
          "Geciken devreye almayı nakit planında deneyin.",
        ],
        ["credit"],
      ),
    ],
  },
  hvac: {
    headline: "Cihaz satışından bölgesel servis ilişkisine geçmek",
    opening:
      "Bir otel ya da fabrikanın satın aldığı hizmet, cihazın sahada beklenen kapasiteyle çalışması ve arıza anında müdahale edilmesidir. Örneğin Kuzey İtalya’daki oteller için yerel bir servis ekibi, Avusturya’daki bir fabrika içinse kendi bakım ekibine eğitim ve sahada kritik parça stoku, Türk üreticisinin proje teklifine ölçülebilir bir işletme taahhüdü ekleyebilir.",
    buyer:
      "Mekanik taahhüt firmaları, tesis yöneticileri, otel grupları ve bakım hizmeti veren teknik işletmeler.",
    deliverable:
      "Tek saha için kurulum, performans kabulü ve servis maliyeti birlikte fiyatlanmış cihaz teklifi.",
    pilot: [
      "Bir tesiste cihaz ailesini ve kabul ölçümünü belirleyin.",
      "Doğrudan Türkiye’den destek ile bölgesel teknisyen ve parça sepetini aynı servis saatleriyle karşılaştırın.",
      "İlk çalıştırma süresini, tekrar ziyaret giderini ve bakım sözleşmesine dönüşen satışı kaydedin.",
    ],
    chapters: [
      section(
        ["Alıcı kanalı", "Tasarım ofisi", "Taahhüt firması", "Tesis sahibi"],
        "Şartname hazırlanırken teknik dosyayla masaya girin",
        [
          "Cihaz siparişi açılmadan önce tasarım ofisi performansı, taahhüt firması montajı ve tesis yöneticisi bakım erişimini değerlendirir. Bu üç muhataba aynı modelin farklı karar bilgilerini sunmak yerel satış temsilcisinin somut katkısıdır.",
        ],
        [
          "Tasarım girdilerini ürün veri sayfasıyla eşleştirin.",
          "Taahhüt ekibine bağlantı ve kaldırma planı verin.",
          "Tesis sahibi için bakım sürelerini belirtin.",
        ],
      ),
      section(
        ["Dağıtım", "Ana cihaz", "Parça sepeti", "Son teslim"],
        "Hacimli cihazla küçük kritik parçayı farklı yönetin",
        [
          "Projeye özel cihazı doğrudan şantiyeye göndermek ara elleçlemeyi azaltabilir. Sensör, kart ve filtre gibi sık kullanılan parçalar ise bölge stokundan çıkabilir. Karar her modelin arıza sıklığı ve yerine koyma süresiyle verilmelidir.",
        ],
        [
          "Ana cihazı montaj tarihine göre yükleyin.",
          "Parça listesini kurulu cihaz parkına bağlayın.",
          "Taşıyıcıdan randevulu saha teslimi fiyatı alın.",
        ],
      ),
      section(
        ["Servis", "Devreye alma", "Müdahale", "Bakım"],
        "Hizmet sözünü teknisyen takvimine bağlayın",
        [
          "Bir şehirde servis adresi göstermek, yüksek sezonda ekibin müsait olacağı anlamına gelmez. Sözleşmeli ortağın kapsadığı bölgeyi, çalışma saatlerini, ikinci ziyaret koşulunu ve yedek teknisyeni teklife dahil edin.",
        ],
        [
          "İlk çalıştırma kontrol listesini birlikte tamamlayın.",
          "Çağrı önceliğine göre yanıt süresi belirleyin.",
          "Bakım ziyaretinin ücret ve sarf kapsamını yazın.",
        ],
      ),
      section(
        ["Güven", "Saha ölçümü", "Garanti", "Kayıt"],
        "Verim iddiasını gerçek çalışma koşulunda gösterin",
        [
          "Örnek tesiste ölçülen kapasite ve giriş koşulları, katalogdaki tek bir sayıya göre daha açıklayıcı olabilir. Müşterinin onayladığı ölçüm yöntemiyle kayıt almak, hem yeni alıcıya referans oluşturur hem de garanti uyuşmazlığında başlangıç noktası sağlar.",
        ],
        [
          "Ölçüm cihazı ve kabul koşulunu belirleyin.",
          "Üretici ve uygulamacı sorumluluklarını ayırın.",
          "Servis fişini seri numarasına bağlayın.",
        ],
      ),
      section(
        ["İş modeli", "Distribütör", "Servis ortağı", "Yerel ekip"],
        "Tek satış için ofis kurmadan hizmet kapsamını genişletin",
        [
          "Distribütör stok ve satış kanalı sağlayabilir; servis ortağı teknik uygulamayı üstlenebilir. Aynı firmada birleşseler dahi bu iki hizmetin primini ayrı ölçün. Düzenli bakım sözleşmesi yerel ekibin sabit maliyetine katkı sağladığında yatırım kararını yenileyin.",
        ],
        [
          "Kanal marjını üstlenilen stok riskine bağlayın.",
          "Teknik yetkiyi ürün ailesiyle sınırlayın.",
          "Garantili işin geri ödeme takvimini netleştirin.",
        ],
      ),
      section(
        ["Finansman", "Proje vadesi", "Stok limiti", "Bakım nakdi"],
        "Tahsilatı kurulum ve bakım döngüsüne göre planlayın",
        [
          "Cihaz satışının son ödemesi kabule bağlıysa, ekip ve parça maliyeti tahsilattan önce doğar. Proje finansmanı ile dönen yedek parça stokunun ihtiyacını ayrı dosyalayın. Banka limiti netleşmeden garanti hizmetini karşılıksız üstlenmeyin.",
        ],
        [
          "Kurulum gecikmesinde vade farkını hesaplayın.",
          "Stok devir hızını parçaya göre izleyin.",
          "Yıllık bakım tahsilatını servis günleriyle eşleştirin.",
        ],
        ["credit"],
      ),
    ],
  },
  enerji: {
    headline: "Bir fabrikanın elektrik faturasından Avrupa’daki ilk enerji projesine",
    opening:
      "Bir tesis müdürü çatıya kurulacak panel sayısını bilerek yatırım kararı veremez. Üretim hattı çalışırken güneşten gelen elektriğin ne kadarını kullanabileceğini, hafta sonunda fazla üretime ne olacağını ve arıza halinde kimi arayacağını da görmek ister. Türk ekipman üreticisi veya kurulum firması için ilk satış fırsatı, bu soruları tek bir tesiste ölçülebilir bir teklife çevirmektir.",
    buyer:
      "Fabrika ve depo işletmecileri, enerji hizmet şirketleri, mühendislik ve kurulum yüklenicileri. Teknik müdür tüketim profilini, satın alma ekibi kapsamı, finans birimi nakit takvimini onaylar.",
    deliverable:
      "Bir tesis için doğrudan ekipman satışı ile yerel kurulum ve bakım dâhil teklifi yan yana gösteren kapsam, üretim varsayımları, kabul ölçütü ve ödeme planı.",
    pilot: [
      "Bir sanayi tesisini seçin. İşletmeciden izinli tüketim verisini, vardiya düzenini ve güncel elektrik sözleşmesindeki ilgili fiyat bileşenlerini alın. Başlangıçta doğrulanabilen tek faydayı seçin.",
      "Ekipman teslimi ve çalışır sistem teslimi için aynı kapasitede iki kapsam hazırlayın. Yerel kurulum ortağından ve bakım ekibinden süre, işçilik ve müdahale bedeli alın. Bağlantı takviminin hangi tarafça teyit edileceğini belirtin.",
      "Alıcının kabul edeceği ölçüm dönemini ve raporu işe başlamadan kararlaştırın. İlk dönemin tüketimini, öz tüketilen üretimi, duruşları ve servis giderini varsayımlarla karşılaştırın. Sonraki tesis için düzeltilen teklif ile izinli saha referansını birlikte sunun.",
    ],
    chapters: [
      section(
        ["Alıcı kanalı", "Sanayi tesisi", "Yerel yüklenici", "Karar verici"],
        "Enerji projesine tüketimi yöneten kişinin masasında başlayın",
        [
          "Kuzey İtalya’daki bir üretim tesisine pano veya inverter satmayı düşünün. Yerel yüklenici ekipmanı zaten kendi tasarımına göre seçiyorsa alım kararını teknik dosya, teslim tarihi ve parça bulunabilirliği etkiler. Aynı tesise doğrudan anahtar teslim proje sunulduğunda alıcı, montaj sırasındaki üretim kaybını ve tek muhatabın kim olacağını da fiyatlamak ister.",
          "İkinci bir pazarı aynı yöntemle sınayın. Örneğin Macaristan’da bir fabrikanın bakım ekibiyle, Avusturya’da ise bir kurulum ortağıyla görüşün. İlki size hangi arıza yüzünden üretim durduğunu, ikincisi hangi ekipmanın teklif takvimini aksattığını gösterebilir. İlk pazar tercihini teyitli ihtiyaç ve erişebildiğiniz saha kapasitesine dayandırın.",
        ],
        ["Ekipmanı seçecek mühendisi ve bütçeyi açacak yöneticiyi belirleyin.", "Ürün satışı ile çalışır tesis teslimine ayrı kapsam hazırlayın.", "İlk teklif için sahaya, tüketime ve karar takvimine erişimi doğrulayın."],
      ),
      section(
        ["Tüketim profili", "Vardiya", "Öz tüketim", "Ölçüm aralığı"],
        "Aynı yıllık tüketim, iki tesiste farklı yatırım sonucu verebilir",
        [
          "Hafta içi gündüz çalışan bir atölye ile gece vardiyalı soğuk hava deposunun yıllık tüketimi eşit olabilir. Çatı üretimiyle aynı saate rastlayan yük farklıdır. Aynı zaman aralığındaki tüketim ve beklenen üretimi eşleştirin. Doğrudan öz tüketimi hesaplarken her aralıkta ikisinin küçük olanını alın. Artan üretimi ve depolamayı ayrı senaryolar olarak gösterin.",
          "Örnek bir saatte tesis 60 kWh tüketiyor, sistem 85 kWh üretiyorsa depolama öncesinde 60 kWh tesiste kullanılabilir. Kalan 25 kWh için teknik ve ticari koşulları ayrıca belirleyin. Bu tek saatlik örneği yıla yaymak yerine çalışma günleri, bakım duruşları ve mevsimler için veriyi tekrarlayın.",
        ],
        ["Tesisin paylaşabileceği aralıklı sayaç kayıtlarını alın.", "Hafta içi, hafta sonu ve planlı duruş günlerini ayırın.", "Eksik ölçüm dönemini ve hesabın neye duyarlı olduğunu teklifte yazın."],
      ),
      section(
        ["Bağlantı", "Şebeke işletmecisi", "Saha keşfi", "Proje takvimi"],
        "Ekipmanın teslim tarihiyle sistemin çalışacağı tarihi ayırın",
        [
          "Panolar sahaya geldikten sonra binanın bağlantı noktası, kablo güzergâhı veya tesisin planlı duruş günü netleşmemişse malzeme bekler. Zagreb’deki bir saha için alınan bağlantı teyidiyle Ljubljana’daki başka bir sahanın takvimi kurulamaz. Her adres için ilgili işletmecinin yanıtını, proje sahibinin kararını ve kurulum ortağının iş programını ayrı izleyin.",
        ],
        ["Alıcıdan güncel saha çizimi ve bilinen kapasite sınırlarını isteyin.", "Bağlantı başvurusunu yürütecek tarafı ve beklenen yazılı yanıtı tanımlayın.", "Sevk, montaj, devreye alma ve kabul için ayrı tarih belirleyin."],
      ),
      section(
        ["Teklif kapsamı", "Güneş enerjisi", "Depolama", "Verimlilik"],
        "Bataryayı ve verimlilik yatırımını sağladığı ek katkıyla fiyatlayın",
        [
          "Önce yükü azaltacak bir verimlilik uygulamasını, ardından kalan tüketim için çatı üretimini hesaplayın. Depolama düşünülüyorsa hangi saatlerde şarj edileceğini, hangi yük için boşalacağını ve dönüşüm kayıplarını modelleyin. Aynı elektriği hem şebekeye satış hem de sonradan tesiste kullanım geliri olarak saymak, yatırımın getirisini şişirir.",
          "Teklifi ekipman, mühendislik, montaj, ölçüm ve bakım kalemlerine açın. Bir alıcı düşük ilk ödeme ararken diğeri üretim kesintisinin maliyetinden dolayı planlı servis ziyaretini satın alabilir. İsteğe bağlı modülleri alıcı kendi tüketim verisiyle değerlendirebilmelidir.",
        ],
        ["Verimlilik sonrası tüketimi yeni başlangıç değeri olarak kullanın.", "Depolamalı ve depolamasız iki hesabı aynı saatlerde karşılaştırın.", "Bakım, kayıp ve ilerideki parça değişim varsayımlarını gösterin."],
      ),
      section(
        ["Saha kabulü", "Sayaç", "Bakım", "Garanti"],
        "Saha referansını alıcının da okuyabileceği ölçümlerle oluşturun",
        [
          "İlk tesisin ikinci siparişe dönüşmesi, bir arıza çıktığında ne yapıldığına da bağlıdır. Müşteri ile üretim sayacını, tüketim kaydını, arıza bildirim kanalını ve bakım saatlerini kararlaştırın. Basit bir raporda beklenen üretim, ölçülen üretim ve tesisin kullanabildiği kısım ayrı görünsün. Hava, vardiya ve duruş farklarını açıklamak teklif güvenilirliğini artırır.",
        ],
        ["Kabul testini imzalayacak kişiyi ve kullanılacak ölçüm kaydını belirleyin.", "Kritik parçanın konumu ile arıza çağrısına yanıt süresini fiyatlayın.", "İlk ayın raporunu alıcıyla inceleyip referans paylaşım iznini ayrıca alın."],
      ),
      section(
        ["Nakit akışı", "Avans", "Hakediş", "İşletme sermayesi"],
        "Tahsilat son kabule bağlıysa gecikmeyi tekliften önce fiyatlayın",
        [
          "Tedarikçi avansı bugün isterken fabrika ödemeyi kabule bağlıyorsa takvimdeki bir kayma kârlı projeyi nakit açısından zorlayabilir. Ekipman siparişi, sevkiyat, montaj ve kabul tarihine düşen giriş ve çıkışları haftalık yazın. Bir ay gecikme halinde ne kadar ek kaynak gerekeceğini görün. Alıcı avansı, tedarikçi vadesi ve yazılı banka teklifi bu açığın farklı bölümlerini kapatabilir.",
          "Her hedef ülkede tasarrufun dayandığı elektrik bedelini müşterinin sözleşmesiyle, fazla üretim gelirini ilgili ticari teklifle teyit edin. Teşvik gelirini ayrıca gösterin. Ekipman satışındaki brüt marj, finansman gideri ve bakım yükü düşüldükten sonra pilotun hangi kapsamda tekrarlanabileceği görünür.",
        ],
        ["Her ödeme dilimini teslim edilebilir bir iş ve kanıta bağlayın.", "Ödeme gecikirse en yüksek nakit açığını ve taşıma maliyetini hesaplayın.", "Yazılı koşulları bulunan finansmanı ve teyit bekleyen desteği ayrı kaydedin."],
      ),
    ],
  },
};
