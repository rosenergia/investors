"""Build the investors.com.tr homepage and country briefings using the Python standard library."""
import hashlib
import json
from pathlib import Path
from html import escape

ROOT = Path(__file__).resolve().parent
OUT = ROOT / "public"
BASE = 'https://investors.com.tr'
DESK = 'https://slovenia.investors.com.tr/'
pilots = json.loads((ROOT / 'pilots.json').read_text())
countries = [
    ('SI','Slovenya','slovenya','Adriyatik’ten Orta Avrupa’ya','Bir dağıtım noktasından birden fazla pazara hizmet verirken depolama, son teslimat ve teknik desteği birlikte değerlendirin.',DESK),
    ('AT','Avusturya','avusturya','Distribütörle ilk sipariş','Bir dağıtıcının stok ve servis beklentisini küçük bir siparişte ölçerek teklifin kapsamını belirleyin.',None),
    ('IT','İtalya','italya','İkinci siparişin koşulları','Kuzey İtalya’da bir alıcıyla numuneden tekrar siparişe geçerken kalite onayını ve teslim penceresini netleştirin.',None),
    ('HR','Hırvatistan','hirvatistan','Sezon başlamadan önce','Turizm tesislerine ve sahadaki yüklenicilere teklif verirken sezon açılışını, bakım aralığını ve ikmal sürelerini karşılaştırın.',None),
    ('HU','Macaristan','macaristan','Fabrikanın satın alma takvimi','Bir üretim tesisinde vardiya, duruş ve teslim kısıtlarını alıcıyla görüşerek ilk denemenin kapsamını daraltın.',None),
    ('DE','Almanya','almanya','Birden fazla şubeye teslim','Tek merkezden beslenen şubelerde paketleme, son teslim ve iade maliyetini alıcının kabul koşullarıyla birlikte inceleyin.',None),
    ('CZ','Çekya','cekya','Sanayi alıcısıyla kabul testi','Bir saha denemesinde ürünün kabul ölçütünü, teknik sorumluyu ve sonraki siparişin koşullarını baştan belirleyin.',None),
    ('PL','Polonya','polonya','Dağıtımda birim maliyet','Depo, dağıtım ve satış sonrası işlemlerin sipariş başına katkıyı nasıl değiştirdiğini tek bir ürün ailesinde ölçün.',None),
]
sectors = {
    'tekstil':('Tekstil','İkinci siparişin ekonomisi','İlk sevkiyat bittikten sonra eksilen bedenleri kim tamamlayacak? Yakın stok kararını bir distribütörün gerçek ikmal sepetiyle tartın.'),
    'celik':('Yapısal çelik','Ton fiyatından montaj maliyetine','Vinç beklemesi, çizim revizyonu ve sevk sırası aynı tonaj için verilen iki teklifin sıralamasını değiştirebilir.'),
    'enerji':('Enerji','Bir tesisin tüketim eğrisi','Çatıdaki üretim ile tesisteki tüketimin hangi saatlerde örtüştüğünü görerek ilk enerji teklifini hazırlayın.'),
    'makine':('Makine','Satıştan sonra hattı kim çalıştıracak?','Kabul testini, ilk yedek parçayı ve yerel servis sorumluluğunu aynı teklifte görünür kılın.'),
    'hvac':('İklimlendirme','Cihazla birlikte servis satmak','Devreye alma ve bakım ziyaretlerini fiyatlarken tesisin çalışma saatlerini ve arıza müdahale süresini hesaba katın.'),
    'gida':('Gıda','Raf ömrü boyunca teslimat','İki güzergâhı soğuk zincir kaydı, kabulde kalan raf ömrü ve sağlam teslim edilen palet üzerinden karşılaştırın.'),
}
globe='<svg viewBox="0 0 32 32" width="29" height="29" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.35"><circle cx="16" cy="16" r="13"/><ellipse cx="16" cy="16" rx="6" ry="13"/><path d="M3 16h26M5 9.5q11 5 22 0M5 22.5q11-5 22 0"/></svg>'
brand=f'<a class="brand" href="/" aria-label="investors.com.tr ana sayfa">{globe}investors.com.tr</a>'
def menu_item(url, title, caption, *, image=None, code=None, current=False):
    icon = (f'<img src="/media/{image}.webp" alt="" loading="lazy">' if image
            else f'<span class="menu-code" aria-hidden="true">{code}</span>')
    active = ' aria-current="page"' if current else ''
    return (f'<a class="menu-item" href="{url}"{active}>{icon}<span>'
            f'<small>{caption}</small><strong>{title}</strong></span>'
            '<span class="menu-arrow" aria-hidden="true">→</span></a>')

def site_menu(path):
    groups = {
        'ulkeler': ('Ülkeler', [menu_item(f'/ulkeler/{slug}/', name, 'Ülke brifingi', code=code,
                                           current=path == f'/ulkeler/{slug}/')
                                for code, name, slug, *_ in countries]),
        'sektorler': ('Sektörler', [menu_item(f'{DESK}#sektor/{key}', row[0], 'Sektör brifingi', image=key)
                                    for key, row in sectors.items()]),
        'masa': ('Brifing masası', [
            menu_item(DESK, 'Slovenya Brifing Masası', 'Ülke masası', image='harbor'),
            menu_item(f'{DESK}#basvuru', 'Firma başvurusu', 'Müşteriyi tanıma', code='↗'),
            menu_item('/#yaklasim', 'Hakkımızda', 'investors.com.tr', code='i'),
            menu_item('/', 'Ana sayfa', 'investors.com.tr', code='⌂', current=path == '/'),
        ]),
    }
    buttons = []
    sections = []
    for key, (label, items) in groups.items():
        active = key == 'ulkeler'
        buttons.append(f'<button type="button" data-group="{key}" aria-controls="liste-{key}" '
                       f'aria-pressed="{str(active).lower()}">{label}</button>')
        sections.append(f'<section id="liste-{key}" aria-label="{label}"'
                        + ('' if active else ' hidden') + '>' + ''.join(items) + '</section>')
    return f'''<dialog id="drawer" aria-label="Site menüsü">
      <div class="menu-tools"><button id="close" aria-label="Menüyü kapat" autofocus>×</button>
      <span aria-hidden="true" class="search-icon"></span>
      <input type="search" id="menu-search" aria-label="Ülke, sektör veya sayfa ara" placeholder="Ülke, sektör veya sayfa ara" autocomplete="off"></div>
      <div class="menu-layout"><div class="menu-categories" role="group" aria-label="Menü kategorileri">{''.join(buttons)}</div>
      <div class="menu-results">{''.join(sections)}<p id="menu-empty" hidden>Sonuç bulunamadı. Başka bir kelime deneyin.</p></div></div>
      </dialog>'''

def asset_url(filename):
    digest = hashlib.sha256((OUT / filename).read_bytes()).hexdigest()[:12]
    return f'/{filename}?v={digest}'

def shell(title, desc, path, body):
    links='<a href="/#ulkeler">Ülkeler</a><a href="/#sektorler">Sektör brifingleri</a><a href="/#yaklasim">Hakkımızda</a>'
    return f'''<!doctype html>
<html lang="tr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>{escape(title)}</title><meta name="description" content="{escape(desc,quote=True)}"><link rel="canonical" href="{BASE}{path}"><meta property="og:title" content="{escape(title,quote=True)}"><meta property="og:image" content="{BASE}/media/harbor.webp"><link rel="icon" href="/globe.svg"><link rel="stylesheet" href="{asset_url('style.css')}"><script defer src="{asset_url('site.js')}"></script></head><body>
<a class="skip" href="#icerik">İçeriğe geç</a><header><div class="mast"><button id="menu" aria-haspopup="dialog" aria-expanded="false" aria-controls="drawer"><span class="hamb" aria-hidden="true"></span>Menü</button>{brand}<a class="desk" href="{DESK}">Slovenya masası <span>↗</span></a></div><nav aria-label="Ana gezinme"><a href="/" {'aria-current="page"' if path=='/' else ''}>Ana sayfa</a>{links}</nav></header>
{site_menu(path)}
<main id="icerik">{body}</main><footer><div>{brand}<p>Orta Avrupa ve Slovenya Yatırım İnisiyatifi</p></div><div>{links}<a href="/media/fotograflar.txt">Fotoğraf kredileri</a></div></footer></body></html>'''
def country_links():
    return ''.join(f'<a href="/ulkeler/{slug}/"><span class="code">{code}</span><span>{name}</span><span class="arrow">→</span></a>' for code,name,slug,*_ in countries)
cards=''.join(f'<a class="story" href="{DESK}#sektor/{key}"><div class="photo"><img loading="lazy" src="/media/{key}.webp" alt=""></div><small>{name} · Sektör brifingi</small><h3>{title}<span> ↗</span></h3><p>{desc}</p></a>' for key,(name,title,desc) in sectors.items())
home=f'''<section class="hero"><div class="hero-copy"><p class="eyebrow"><i></i> Avrupa brifingleri</p><h1>Avrupa’da<br>iş geliştirmek.</h1><p>Üreticiler için ülke ve sektör brifingleri. İlk alıcıdan yerel dağıtıma, Avrupa’da büyümenin ticari kararlarını inceleyin.</p><a class="line" href="#ulkeler">Ülkeleri keşfet <b>↓</b></a></div><figure><img src="/media/harbor.webp" fetchpriority="high" alt="Konteyner terminalinde yükleme vinçleri ve gemilere havadan bakış"><figcaption><span>Dosya odağı</span> Avrupa’da dağıtım</figcaption></figure></section>
<section class="section countries" id="ulkeler"><div class="sectionhead"><h2>Ülke brifingleri</h2><p>Hedef pazarı seçin. Alıcı profillerini ve sektörünüze uygun ilk saha denemesini inceleyin.</p></div><div class="countrygrid"><article class="featured"><small><i></i> Yayındaki ülke masası</small><div><h3>Slovenya</h3><p>Adriyatik’ten Orta Avrupa’ya uzanan dağıtım, üretim ve servis kararları.</p></div><a class="line" href="{DESK}">Slovenya masasına git <b>↗</b></a></article><div class="directory">{country_links()}</div></div></section>
<section class="section sectors" id="sektorler"><div class="sectionhead"><h2>Sektör brifingleri</h2><p>Slovenya masasından altı dosya. Her biri bir üreticinin teklifini değiştirebilecek somut bir kararla başlıyor.</p></div><div class="stories">{cards}</div></section>
<section class="section about" id="yaklasim"><div><small>investors.com.tr hakkında</small><h2>Bir pazar kararı<br>nasıl hazırlanır?</h2></div><div><p>Bir ülkeye girmeden önce ilk müşterinin kim olabileceğini, neyi satın alacağını ve söz verdiğiniz teslimatın maliyetini bilmek gerekir. Brifinglerimiz bu üç kararı alıcı profilleri, saha denemeleri ve ölçülebilir sonuçlarla ele alıyor.</p><a class="line" href="{DESK}#basvuru">Firmanızı Slovenya masasına tanıtın <b>↗</b></a></div></section>'''
(OUT/'index.html').write_text(shell('investors.com.tr | Avrupa ülke ve sektör brifingleri','Avrupa’da iş geliştiren üreticiler için sekiz ülke, altı sektör ve sahada sınanabilecek ticari teklifler.','/',home))
for code,name,slug,focus,intro,desk in countries:
    sections=[]
    for key,(sector,_,__) in sectors.items():
        buyer,trial,measure=map(escape,pilots[key][code])
        sections.append(f'<details {"open" if key=="tekstil" else ""}><summary>{sector}<span></span></summary><div class="briefbody"><div><small>Olası alıcı</small><h3>{buyer}</h3></div><div><small>İlk saha denemesi</small><p>{trial}</p><small>İzlenecek ölçü</small><p>{measure}</p></div></div></details>')
    cta=f'<a class="line" href="{desk}">Slovenya Brifing Masası’na git <b>↗</b></a>' if desk else '<a class="line" href="#denemeler">Sektörleri incele <b>↓</b></a>'
    body=f'''<div class="countryhero"><a href="/#ulkeler">← Tüm ülkeler</a><small>{code} / Ülke brifingi</small><h1>{name}</h1><h2>{focus}</h2><p>{intro}</p>{cta}</div><section class="section" id="denemeler"><div class="sectionhead"><h2>Sahada ilk deneme</h2><p>Sektörünüzü seçerek örnek bir alıcı profilini, görüşmede sunulabilecek teklifi ve takip edilecek ölçüyü açın.</p></div>{''.join(sections)}</section>'''
    folder=OUT/'ulkeler'/slug
    folder.mkdir(parents=True,exist_ok=True)
    (folder/'index.html').write_text(shell(f'{name} ülke brifingi | investors.com.tr',intro,f'/ulkeler/{slug}/',body))
(OUT/'globe.svg').write_text(globe.replace('<svg ','<svg xmlns="http://www.w3.org/2000/svg" ').replace('currentColor','#18479c'))
