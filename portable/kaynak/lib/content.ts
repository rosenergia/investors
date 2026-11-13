export const sectors = [
  {
    "id": "tekstil",
    "name": "Tekstil ve hazır giyim",
    "focus": "Tekrar siparişi ve beden bazında stok",
    "unit": "Adet",
    "questions": [
      "Hangi ürün ailesini, hangi müşteri segmenti için üretiyorsunuz?",
      "İlk sipariş ve tekrar siparişinde asgari adet ve üretim süresi kaç?",
      "Alıcı en çok hangi model, renk ve bedenleri kısa terminle tekrar istiyor?",
      "Geçen sezonda kaç tekrar siparişini termin veya asgari adet yüzünden kaçırdınız?",
      "İade, sezon sonu iskonto ve elde kalan stok maliyetini kim taşıyor?",
      "Deneme için hangi modelde, kaç adet ve hangi süreyle stok ayırabilirsiniz?"
    ],
    "next": "Alıcıdan bir modelin beden dağılımını ve tekrar sipariş takvimini isteyin.",
    "pilot": "Tek modelde küçük stok ve doğrudan sevkiyat hesabı"
  },
  {
    "id": "hvac",
    "name": "HVAC ve iklimlendirme",
    "focus": "Servis kapsamı ve sahada performans",
    "unit": "Cihaz",
    "questions": [
      "Hangi cihazı hangi bina veya tesis türüne sunuyorsunuz?",
      "Satın alma şartnamesini kim yazıyor, teklifi kim onaylıyor?",
      "Müşteri hangi saha koşullarında hangi performansı bekliyor ve bunu hangi ölçümle kabul ediyor?",
      "Devreye alma, bakım, garanti ve arıza müdahalesini bugün kim üstleniyor?",
      "Yerelde tutulması gereken kritik parça ve istenen servis süresi nedir?",
      "Tek tesiste pilot kurulum için yer, sorumlu ve başarı ölçütü belli mi?"
    ],
    "next": "Bir tesisten çalışma koşullarını, kabul ölçütünü ve servis beklentisini yazılı alın.",
    "pilot": "Bir cihaz ve bir tesis için servis dâhil pilot teklif"
  },
  {
    "id": "celik",
    "name": "Yapısal çelik ve konstrüksiyon",
    "focus": "İmalat, nakliye ve saha montajı",
    "unit": "Proje",
    "questions": [
      "Hangi yapı türlerinde ve hangi tonaj aralığında iş teslim ediyorsunuz?",
      "Son teklifte imalat, boya, nakliye, vinç ve montajdan hangilerini üstlendiniz?",
      "Çizim revizyonu ve metraj değişimi fiyatı nasıl etkiliyor?",
      "Alıcı hangi kalite kayıtlarını, teslim belgelerini ve saha yeterliliklerini istiyor?",
      "Şantiyeye erişim, kaldırma ekipmanı ve montaj ekibi için kimden fiyat alındı?",
      "İlk değerlendirme için anonim metraj veya teklif ve hedef teslim tarihi var mı?"
    ],
    "next": "Tek bir metraj için imalat, nakliye ve montaj kapsamını alıcıyla eşleştirin.",
    "pilot": "Aynı metraj ve teslim kapsamıyla iki proje teklifi"
  },
  {
    "id": "makine",
    "name": "Makine ve endüstriyel otomasyon",
    "focus": "Entegrasyon, kabul testi ve duruş süresi",
    "unit": "Hat",
    "questions": [
      "Hangi makineyi veya otomasyon modülünü hangi üretim hattına entegre ediyorsunuz?",
      "Alıcının mevcut çevrim süresi, duruşu veya darboğazı nedir?",
      "Alıcı hangi kapasite, tolerans veya çevrim süresinde hattı kabul eder?",
      "Arayüz, yazılım, operatör eğitimi ve sahada devreye alma kapsamı nedir?",
      "Kurulumda kaç uzman-gün ve hangi yerel servis veya yedek parça gerekir?",
      "Pilot için teknik şartnameyi ve kabul testini kim onaylayacak?"
    ],
    "next": "Tek hattın kabul testini ve devreye alma maliyetini birlikte netleştirin.",
    "pilot": "Bir modül için alıcı onaylı kabul testi ve entegrasyon teklifi"
  },
  {
    "id": "gida",
    "name": "Gıda ve soğuk zincir",
    "focus": "Palet hacmi, fire ve kalan raf ömrü",
    "unit": "Palet",
    "questions": [
      "Hangi ürün hangi aylarda, hangi sıcaklık ve raf ömrü koşuluyla taşınıyor?",
      "Ay bazında asgari ve yoğun dönem palet hacmi nedir?",
      "Mevcut güzergâhta fire, ret veya iskonto en çok hangi teslim noktasında doğuyor?",
      "Alıcının teslimde istediği kalan raf ömrü, sıcaklık kaydı ve ambalaj nedir?",
      "Ön soğutma, depolama, tasnif ve son dağıtım için palet başına gider nedir?",
      "Alıcı veya ihracatçı hangi aylar için hangi fiyatla asgari hacim taahhüt edebilir?"
    ],
    "next": "Bir ürün için sezonluk palet takvimi ve yazılı soğuk depo fiyatı alın.",
    "pilot": "Tek ürün ve güzergâhta teslim edilen sağlam palet başına maliyet"
  },
  {
    "id": "enerji",
    "name": "Enerji",
    "focus": "Öz tüketim, proje kabulü ve kurulum sonrası bakım",
    "unit": "Tesis",
    "questions": [
      "Hangi işi üstleniyorsunuz: ekipman tedariki, çatı GES kurulumu, enerji depolama, verimlilik veya bakım?",
      "Şu anda iş kazanmanızı ya da teslim etmenizi en çok ne zorlaştırıyor? Son tekliften bir örnek verebilir misiniz?",
      "Tesiste hangi tüketim veya üretim verisi var? Eksik veri teklifinizi nasıl etkiliyor?",
      "Şebeke bağlantısını, yerel kurulumu ve devreye alma takvimini kim takip ediyor? Hangi adımda bekliyorsunuz?",
      "Hangi ödeme, teminat, garanti veya servis koşulu sizde en fazla nakit veya ekip yükü oluşturuyor?",
      "İlk tesiste hangi sonucu, hangi sayaç veya kabul tutanağıyla ve hangi tarihte gösterebilirsiniz?"
    ],
    "next": "Bir tesisten tüketim dökümünü, ekipman kapsamını ve yerel kurulum teklifini aynı proje için isteyin.",
    "pilot": "Tek tesiste öz tüketim ve yerel servis teklifi"
  }
];
export const common = ["Firmanız ne üretiyor veya hangi işi üstleniyor? Görüşmede sizi hangi rolünüzle tanıyalım?","Hangi ürünü ya da projeyi, hangi ülkede ve hangi alıcı tipine sunmak istiyorsunuz?","Alıcı bugün ihtiyacını nasıl karşılıyor ve satın alma kararını kim veriyor?","Son teklifinizde hangi şart yüzünden sipariş kaybettiniz veya marjınız düştü?","Aynı teslim noktası ve kapsam için hacim, satış fiyatı, maliyet ve ödeme vadesi nedir?","Denemeye hangi kaynağı ayırabilirsiniz, kararı kim verecek ve ne zaman?"];
export const guide = "# investors.com.tr · Slovenya Brifing Masası çalışma rehberi\n\nTürkiye’de üretim ve ihracat yapan bir sanayiciyle çalışan ticari iş geliştirme ortağı olarak hareket et. Hedef pazardaki şirketin kendi tesis yatırımlarını, firmalara sunduğu hizmetleri ve iki tarafın birlikte üstlendiği ticari girişimleri ayrı değerlendir. Slovenya, Avusturya, İtalya, Hırvatistan ve Macaristan ile diğer Avrupa pazarlarını alıcının konumuna, teslim adresine ve servis ihtiyacına göre karşılaştır.\n\n1. Her dosyayı tek bir ürün, sipariş veya projeye indir. Hedef ülkeyi, alıcı tipini, kararı veren kişiyi, alternatif tedarikçiyi ve müşterinin satın alma nedenini belirle.\n2. Ürün dosyasında tekrar siparişi, birim, stok ve tahsilat koşullarını sor. Proje dosyasında kapsam, iş programı, kabul ölçütü, sorumluluk ve ödeme takvimini sor. İlk temasta ticari sır ve alıcı adı istemeden ilerle.\n3. Türkiye’den mevcut yöntem ile seçilen Avrupa pazarında önerilen dağıtım veya servis modelini aynı miktar, para birimi, teslim noktası, süre ve hizmet kapsamıyla karşılaştır. Satıştan üretim, nakliye, stok, iade, yerel servis ve ilgili diğer giderleri düş. Kaçınılabilir sabit gideri ayrı göster. Firmanın katkısını, bizim ücret ve maliyetimizi, çalışma sermayesini ayrı izle.\n4. Her önemli rakamı müşteri beyanı, tahmin, yazılı teklif veya gerçekleşen işlem olarak işaretle. Eksik bilgiyi sıfır sayma. Fırsat için kötüleşme senaryosunu ve başabaş koşulunu göster. Vergi, teşvik, gümrük ve izin iddialarını ülke, tarih, ürün ve resmî kaynakla doğrula.\n5. Sahip olduğumuz, sözleşmeli bir ortakla sunduğumuz ve henüz araştırdığımız kaynakları doğru tanıt. İnisiyatifin, sözleşme yapacak şirketin ve uzman hizmet sağlayıcının rolünü açıkla. Komisyon, hizmet bedeli veya ortaklık teklifini kimin ne katkı sunduğuna ve hangi riski taşıdığına bağla.\n6. İlk görüşme için sektöre özel mesaj, üç öncelikli soru ve bir somut talep hazırla. Sonunda müşterinin okuyacağı kısa karar notu üret. Dosyada sorumluyu, bitiş tarihini, istenecek kanıtı ve pilotun başarı ölçütünü göster. Alternatif daha iyi çıkıyorsa o sonucu da açıkça yaz.\n7. Kendi tesis yatırımlarında hibesiz işletme sonucunu, aylık talebi ve yazılı hacim taahhütlerini ayrı incele. Hizmet başvurusunu otomatik olarak yatırım talebine veya bağlayıcı siparişe dönüştürme.";
