# investors.com.tr · Slovenya Brifing Masası · Ürün ve Proje Masası

**Hemen denemek için** dosyaları aynı klasöre çıkarın ve index.html dosyasını tarayıcınızda açın. Firma başvurusu düğmesini açın, sektörünüzü seçip ihtiyacınızı yazın. Başvuruyu JSON olarak indirip görüşeceğiniz kişiye iletebilir veya yazdırabilirsiniz. Ticari hesap yapmak için menüden Yeni değerlendirme seçeneğini açın. Bu kullanımda sunucuya kayıt veya davet gönderimi yapılmaz.

**Sadece firma formunu paylaşmak için** firma-basvurusu.html dosyasını müşterinize gönderin. Tarayıcısında doldurup JSON yanıt dosyasını size iletebilir. Dosyalarım bölümünden bu yanıtı içe aktarın.

**Kalıcı kayıt ve firma daveti için** Node.js 24 veya üzeri ile bu klasörde `node start.mjs` çalıştırın. macOS üzerinde Baslat.command aynı işlemi yapar. Paket ek bağımlılık kurulumu gerektirmez. Terminalde çıkan yönetici bağlantısını kendi tarayıcınızda açın. Dosyalarım bölümünde firma davet bağlantınızı oluşturun. Yönetici bağlantısı masadaki tüm dosyaları açabilir. Firmalar için Dosyalarım bölümünde oluşturduğunuz davet bağlantısını kullanın.

**Firmanın kullanımı.** Firma davetle sektörünü seçer ve başvurusunu gönderir. Çevrimdışı yanıtlayan firmaların JSON dosyaları Dosyalarım ekranından içe aktarılabilir. Dosya daveti oluşturan masaya düşer. Yönetici durumu, sonraki adımı, sorumluyu ve tarihi günceller. Firmanın erişimi kendi tarayıcısındaki oturumla 30 gün sürer. Paylaşımlı bilgisayarda ayrı bir tarayıcı profili kullanın. Bu sürümde firmalar için cihazlar arası hesap kurtarma yoktur.

**Sunucuda yayın.** Uygulamayı kalıcı diskli bir Node.js sunucusuna kurun. Varsayılan olarak 127.0.0.1:4197 üzerinde çalışır. HTTPS alan adından gelen trafiği bu adrese yönlendiren bir ters vekil yapılandırın ve PUBLIC_ORIGIN değerini gerçek HTTPS kök adresine ayarlayın. PORT ve DATA_DIR isteğe bağlıdır. Yönetici ekranında oluşturulan firma bağlantısı tarayıcıda açtığınız alan adını kullanır. Yerel adres yalnızca aynı bilgisayarda erişilebilir.

Veritabanı, oturumlar ve yönetici anahtarı DATA_DIR altında saklanır. Varsayılan klasör veriler dizinidir. Bu dizini statik olarak paylaşmayın. Yedek alırken sunucuyu durdurup tüm veri klasörünü kopyalayın. Yönetici anahtarını döndürmek için sunucu kapalıyken anahtar dosyasını değiştirin ve açık yönetici oturumlarını da iptal edin.

**Hesap.** Her iki yöntem için aynı birim ve dönem seçilir. Katkı = (satış – üretim – operasyon – yerel hizmet) × miktar – dönemin ek sabit gideri. Eksik rakam içeren yöntem için katkı hesaplanmaz. Bağlanan sermaye ayrı gösterilir. Tahsilat, vergiler ve finansman giderleri kendiliğinden modellenmez. Başabaş miktarı yalnızca iki yöntem pozitif bir miktarda kesiştiğinde gösterilir. %10 fiyat düşüşü senaryosunda diğer tüm rakamlar sabittir.

Kaynak klasöründe arayüz, değerlendirme kuralları, soru bankası ve kayıt rotalarının okunabilir sürümleri bulunur. Ana talimat ve 42 görüşme sorusu ayrıca Slovenija-Calisma-Rehberi.md dosyasındadır.
