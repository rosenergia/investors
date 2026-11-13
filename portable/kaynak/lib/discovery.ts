export type Activity = [name: string, question: string, evidence: string];
type Profile = {name: string; activities: Activity[]};
export const profiles: Record<string, Profile> = {
  celik: {name: "İnşaat ve renovasyon", activities: [
    ["Yapısal çelik ve konstrüksiyon", "Son projede hangi çizim revizyonu tonajı veya montaj sırasını değiştirdi? Farkı kim onayladı?", "Onaylı metraj ile son revizyon arasındaki fark ve gerçekleşen ekip-gün."],
    ["Renovasyon ve güçlendirme", "Son yenilemede sökümden sonra hangi beklenmedik iş çıktı? İşveren ek kapsamı nasıl onayladı?", "Keşif özeti, değişiklik onayı ve kullanıma kapalı kalınan gün."],
    ["Anahtar teslim inşaat ve EPC", "Mühendislik, satın alma ve yapım paketlerinin sınırında kalan son iş neydi? Süre ve bütçeyi kim üstlendi?", "Paket sınırları, sorumluluk çizelgesi ve kabul takvimi."],
    ["Genel taahhüt ve alt yüklenici işleri", "Son ihalede paketi kim tanımladı, alt yükleniciyi kim seçti ve hakedişi kim imzaladı?", "Teklif kapsamı, ihale takvimi ve hakediş onay zinciri."],
  ]},
  enerji: {name: "Enerji", activities: [
    ["Güneş enerjisi", "Son güneş projesinde üretim ile tüketimin aynı saatlere denk geldiğini hangi veriden gördünüz?", "Saatlik tüketim, üretim tahmini ve bağlantı görüşü."],
    ["Rüzgâr enerjisi", "Son projede türbin teslimi, saha erişimi veya kaldırma takviminden hangisi devreye almayı belirledi?", "Saha programı, teslim penceresi ve kabul tarihi."],
    ["Doğalgaz ve kombine çevrim", "Son santral işinde hangi yük koşulunda hangi performans taahhüdünü verdiniz? Kabulü kim yaptı?", "Yük profili, performans testi kapsamı ve bakım duruşu."],
    ["Jeotermal enerji ve çevrim santralleri", "Son fizibilitede hangi kuyu verisi net üretim tahminini değiştirdi? Bu varsayımı kim doğrulayacak?", "Debi ve sıcaklık ölçüm dönemi, net üretim hesabı ve ölçüm sahibi."],
    ["Diğer yenilenebilir enerji ve depolama", "Son projede hangi kaynağı veya depolama sistemini hangi tüketim ihtiyacıyla eşleştirdiniz?", "Kaynak profili, kullanım süresi ve sayaçla ölçülecek sonuç."],
  ]},
  gida: {name: "Gıda ve soğuk zincir", activities: [
    ["Taze meyve ve sebze", "Son yükte ürün hangi noktada sınıf kaybetti? Alıcı kaç kasayı hangi gerekçeyle reddetti?", "Hasat ve teslim saatleri, kabul kaydı ve satılabilir kasa sayısı."],
    ["Et, süt ve su ürünleri", "Son partide hangi sıcaklık veya kalan raf ömrü şartı kabulü etkiledi?", "Parti sıcaklık kaydı, teslim saati ve kalan raf ömrü."],
    ["Dondurulmuş ve işlenmiş gıda", "Son sevkte sıcaklık sapması veya hasarlı ambalaj hangi partiyi etkiledi? Ayırma giderini kim üstlendi?", "Parti ve ambalaj kaydı, reddedilen miktar ve iskonto."],
    ["Soğuk depolama ve soğutmalı taşıma", "Son taşımada yük hangi devir noktasında bekledi? Sıcaklığı ve sorumluluk devrini nasıl kaydettiniz?", "Depo çıkış saati, araç kaydı ve imzalı teslim fişi."],
  ]},
  makine: {name: "Endüstri", activities: [
    ["Demir ve çelik üretimi", "Son partide hangi kalite sınıfı, tolerans veya teslim koşulu alıcının kabulünü değiştirdi?", "Parti sertifikası, kabul edilen ton ve yeniden işleme gideri."],
    ["Alüminyum ve ekstrüzyon", "Son profilde alaşım, kalıp veya yüzey şartından hangisi fireyi ya da ilk numune süresini artırdı?", "Numune onayı, kalıp süresi ve kullanılır profil başına maliyet."],
    ["Döküm ve metal işleme", "Son seride hangi ölçü toleransı tekrar işlem gerektirdi? Kabul numunesini kim onayladı?", "Ölçüm raporu, yeniden işlenen adet ve çevrim süresi."],
    ["Makine ve endüstriyel otomasyon", "Son hat kurulumunda hangi kapasite veya duruş koşulu saha kabulünü geciktirdi?", "Kabul protokolü, gerçekleşen çevrim süresi ve servis kaydı."],
  ]},
  hvac: {name: "İklim değişikliği ve iklimlendirme", activities: [
    ["HVAC ve bina iklimlendirmesi", "Son tesiste hangi çalışma saatinde konfor veya hava kalitesi hedefi sağlanamadı?", "Zon ölçümü, kullanım saatleri ve kabul aralığı."],
    ["Isı pompaları ve ısı geri kazanımı", "Son tesiste hangi dış sıcaklıkta hangi ısı ihtiyacını karşıladınız? Ek ısıtma ne zaman devreye girdi?", "Yük ve sıcaklık profili ile aynı dönemin sayaç değerleri."],
    ["Enerji verimliliği ve emisyon azaltımı", "Son projede tasarrufu hangi başlangıç dönemiyle karşılaştırdınız? Üretim veya hava koşullarındaki farkı nasıl ayırdınız?", "Başlangıç sayacı, işletme koşulları ve karşılaştırma dönemi."],
    ["İklim risklerine uyum", "Son sıcak hava, taşkın veya su kısıtı hangi faaliyeti kaç saat durdurdu? En hassas tesisi kim belirledi?", "Olay kaydı, kaybedilen çalışma saati ve öncelikli tesis."],
  ]},
  tekstil: {name: "Tekstil ve hazır giyim", activities: [
    ["Hazır giyim ve özel marka", "Son tekrar siparişinde hangi renk veya beden teslim tarihini değiştirdi?", "Beden dağılımı, tekrar sipariş tarihi ve teslim süresi."],
    ["Teknik tekstil ve iş kıyafeti", "Son numunede alıcının işlev veya dayanım şartını kim onayladı?", "Numune kabul ölçütü ve yeniden sipariş planı."],
    ["Kumaş, iplik ve ev tekstili", "Son partide ton farkı, minimum miktar veya termin hangi siparişi etkiledi?", "Parti onayı, metraj ve teslim kaydı."],
  ]},
};
export const projectRoles: Record<string,string> = {
  "İşveren / yatırımcı": "Son bütçe kararında kim imza attı ve işe başlama kararını hangi bilgi belirledi?",
  "Ana yüklenici": "Hangi işleri alt yükleniciye verdiniz? İşverene karşı kabul ve gecikme sorumluluğu kimde kaldı?",
  "EPC yüklenicisi": "Tasarım onayı, satın alma, yapım ve performans garantisini kim üstlendi? Açıkta kalan bir iş paketini tarif eder misiniz?",
  "Alt yüklenici / montaj firması": "Sahaya giriş, diğer ekiplerle koordinasyon ve hakediş onayı kimin sorumluluğundaydı?",
  "Üretici / ekipman tedarikçisi": "Son teslimde ürünün uygunluğunu kim kabul etti? Montaj ve garantiye hangi noktada devredildi?",
  "İşletmeci / servis sağlayıcı": "Son arızada müdahale süresi, yedek parça ve üretim kaybını hangi taraf üstlendi?",
  "Dağıtıcı / lojistik ortağı": "Son siparişte stok, taşıma ve iadeyi kim yönetti? Teslimde hangi kayıt sorumluluğu devretti?",
  "Tasarımcı / danışman": "Şartnameyi kim hazırladı, revizyonu kim onayladı ve işverene hangi teslimatı yaptınız?",
  "Diğer / birden fazla rol": "Son işte üstlendiğiniz işleri ve diğer taraflara devrettiğiniz sorumlulukları nasıl ayırdınız?",
};
export const interviewSteps = [
  ["İlk görüşme", "Son tamamlanan veya kaybedilen işi seçin. Ürünü, ülkeyi, alıcı tipini ve firmanın bu işteki rolünü sorun."],
  ["Etkisini ölçün", "Nerede aksadı? Kaç gün, ton, palet veya sipariş etkilendi? Rakamın ölçüm mü tahmin mi olduğunu ve hangi dönemi kapsadığını kaydedin."],
  ["Kararı doğrulayın", "Teknik kabulü, bütçeyi ve ödemeyi kim onaylıyor? Bir sonraki görüşmeye hangi rolün katılması gerektiğini belirleyin."],
  ["Takibi kapatın", "Tek bir sonraki iş, sorumlu, tarih ve kabul ölçütü belirleyin. Tarih geldiğinde belge geldiyse pilotu planlayın. Eksikse beklenen bilgiyi ve yeni tarihi çalışma masasına yazın."],
];
export function activityOf(sector:string, activity:string) {
  return profiles[sector]?.activities.find(([name]) => name === activity);
}
export function interviewQuestions(activity: Activity, role: string) {
  return [activity[1], projectRoles[role] || projectRoles["Diğer / birden fazla rol"],
    "Teknik kabul, bütçe ve ödeme için hangi tarafların onayı gerekiyor?",
    "Bu sonucu hangi kayıtla doğrulayabilirsiniz? Kaydın tarihi nedir?",
    "İlk denemede hangi değeri, hangi başlangıç değeriyle karşılaştıracaksınız?",
    "Sonraki görüşmeye kadar kim, hangi çıktıyı, hangi tarihte paylaşacak?"];
}

export function discoveryGuide() {
  return [
    "## Müşteriyi tanıma ve takip",
    ...interviewSteps.map(([title,text]) => title + ". " + text),
    ...Object.values(profiles).flatMap(p => ["### " + p.name,
      ...p.activities.map(([name,question,evidence]) => name + "\n\n" + question + "\n\nİstenecek kayıt: " + evidence)]),
    "### Firmanın rolü",
    ...Object.entries(projectRoles).map(([role,question]) => role + " — " + question),
  ].join("\n\n");
}
