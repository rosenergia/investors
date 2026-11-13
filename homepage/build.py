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
sector_directory = json.loads((ROOT / 'sectors.json').read_text())

def sector_url(sector):
    return '/sektorler/' + sector['slug'] + '/'

def topic_links(sector):
    url = sector_url(sector)
    return ''.join(f'<a href="{url}#{slug}">{escape(label)}</a>'
                   for slug, label, _ in sector['topics'])

def sector_menu(sector):
    return (f'<details class="sector-menu"><summary><img src="/media/{sector["image"]}.webp" alt="">'
            f'{escape(sector["name"])}<span aria-hidden="true"></span></summary><div class="topic-links">'
            f'<a href="{sector_url(sector)}">Sektörün genel görünümü</a>{topic_links(sector)}</div></details>')

def sector_card(sector):
    return (f'<article class="story"><a href="{sector_url(sector)}"><div class="photo">'
            f'<img loading="lazy" src="/media/{sector["image"]}.webp" alt=""></div>'
            f'<h3>{escape(sector["name"])} <span>→</span></h3></a>'
            f'<p>{escape(sector["intro"])}</p><div class="topic-links">{topic_links(sector)}</div></article>')

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
        'sektorler': ('Sektörler', [sector_menu(sector) for sector in sector_directory]),
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
        active = key == 'sektorler'
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
    links='<a href="/#ulkeler">Ülkeler</a><a href="/#sektorler">Sektörler</a><a href="/#yaklasim">Hakkımızda</a>'
    return f'''<!doctype html>
<html lang="tr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>{escape(title)}</title><meta name="description" content="{escape(desc,quote=True)}"><link rel="canonical" href="{BASE}{path}"><meta property="og:title" content="{escape(title,quote=True)}"><meta property="og:image" content="{BASE}/media/harbor.webp"><link rel="icon" href="/globe.svg"><link rel="stylesheet" href="{asset_url('style.css')}"><script defer src="{asset_url('site.js')}"></script></head><body>
<a class="skip" href="#icerik">İçeriğe geç</a><header><div class="mast"><button id="menu" aria-haspopup="dialog" aria-expanded="false" aria-controls="drawer"><span class="hamb" aria-hidden="true"></span>Menü</button>{brand}<a class="desk" href="{DESK}">Slovenya masası <span>↗</span></a></div><nav aria-label="Ana gezinme"><a href="/" {'aria-current="page"' if path=='/' else ''}>Ana sayfa</a>{links}</nav></header>
{site_menu(path)}
<main id="icerik">{body}</main><footer><div>{brand}<p>Orta Avrupa ve Slovenya Yatırım İnisiyatifi</p></div><div>{links}<a href="/media/fotograflar.txt">Fotoğraf kredileri</a></div></footer></body></html>'''
def country_links():
    return ''.join(f'<a href="/ulkeler/{slug}/"><span class="code">{code}</span><span>{name}</span><span class="arrow">→</span></a>' for code,name,slug,*_ in countries)
cards = ''.join(sector_card(sector) for sector in sector_directory)
home=f'''<section class="hero"><div class="hero-copy"><p class="eyebrow"><i></i> Avrupa brifingleri</p><h1>Avrupa’da<br>iş geliştirmek.</h1><p>Üreticiler için ülke ve sektör brifingleri. İlk alıcıdan yerel dağıtıma, Avrupa’da büyümenin ticari kararlarını inceleyin.</p><a class="line" href="#ulkeler">Ülkeleri keşfet <b>↓</b></a></div><figure><img src="/media/harbor.webp" fetchpriority="high" alt="Konteyner terminalinde yükleme vinçleri ve gemilere havadan bakış"><figcaption><span>Dosya odağı</span> Avrupa’da dağıtım</figcaption></figure></section>
<section class="section countries" id="ulkeler"><div class="sectionhead"><h2>Ülke brifingleri</h2><p>Hedef pazarı seçin. Alıcı profillerini ve sektörünüze uygun ilk saha denemesini inceleyin.</p></div><div class="countrygrid"><article class="featured"><small><i></i> Yayındaki ülke masası</small><div><h3>Slovenya</h3><p>Adriyatik’ten Orta Avrupa’ya uzanan dağıtım, üretim ve servis kararları.</p></div><a class="line" href="{DESK}">Slovenya masasına git <b>↗</b></a></article><div class="directory">{country_links()}</div></div></section>
<section class="section sectors" id="sektorler"><div class="sectionhead"><h2>Sektör brifingleri</h2><p>Sektörünüzü veya faaliyet alanınızı seçerek teklif kapsamını, alıcı beklentilerini ve teslim koşullarını inceleyin.</p></div><div class="stories">{cards}</div></section>
<section class="section about" id="yaklasim"><div><small>investors.com.tr hakkında</small><h2>Bir pazar kararı<br>nasıl hazırlanır?</h2></div><div><p>Bir ülkeye girmeden önce ilk müşterinin kim olabileceğini, neyi satın alacağını ve söz verdiğiniz teslimatın maliyetini bilmek gerekir. Brifinglerimiz bu üç kararı alıcı profilleri, saha denemeleri ve ölçülebilir sonuçlarla ele alıyor.</p><a class="line" href="{DESK}#basvuru">Firmanızı Slovenya masasına tanıtın <b>↗</b></a></div></section>'''
(OUT/'index.html').write_text(shell('investors.com.tr | Avrupa ülke ve sektör brifingleri','Avrupa’da iş geliştiren üreticiler için sekiz ülke, altı sektör ve sahada sınanabilecek ticari teklifler.','/',home))
for code,name,slug,focus,intro,desk in countries:
    sections=[]
    for key,sector in [('celik','Yapısal çelik'),('enerji','Enerji'),('gida','Gıda ve soğuk zincir'),('makine','Makine'),('hvac','İklimlendirme'),('tekstil','Tekstil')]:
        buyer,trial,measure=map(escape,pilots[key][code])
        sections.append(f'<details {"open" if key=="tekstil" else ""}><summary>{sector}<span></span></summary><div class="briefbody"><div><small>Olası alıcı</small><h3>{buyer}</h3></div><div><small>İlk saha denemesi</small><p>{trial}</p><small>İzlenecek ölçü</small><p>{measure}</p></div></div></details>')
    cta=f'<a class="line" href="{desk}">Slovenya Brifing Masası’na git <b>↗</b></a>' if desk else '<a class="line" href="#denemeler">Sektörleri incele <b>↓</b></a>'
    body=f'''<div class="countryhero"><a href="/#ulkeler">← Tüm ülkeler</a><small>{code} / Ülke brifingi</small><h1>{name}</h1><h2>{focus}</h2><p>{intro}</p>{cta}</div><section class="section" id="denemeler"><div class="sectionhead"><h2>Sahada ilk deneme</h2><p>Sektörünüzü seçerek örnek bir alıcı profilini, görüşmede sunulabilecek teklifi ve takip edilecek ölçüyü açın.</p></div>{''.join(sections)}</section>'''
    folder=OUT/'ulkeler'/slug
    folder.mkdir(parents=True,exist_ok=True)
    (folder/'index.html').write_text(shell(f'{name} ülke brifingi | investors.com.tr',intro,f'/ulkeler/{slug}/',body))
(OUT/'globe.svg').write_text(globe.replace('<svg ','<svg xmlns="http://www.w3.org/2000/svg" ').replace('currentColor','#18479c'))

for sector in sector_directory:
    name = escape(sector['name'])
    intro = escape(sector['intro'])
    topics = ''.join(f'<article class="sector-note" id="{slug}" tabindex="-1"><h2>{escape(label)}</h2>'
                     f'<p>{escape(text)}</p></article>' for slug, label, text in sector['topics'])
    body = f'''<section class="countryhero"><a href="/#sektorler">← Tüm sektörler</a>
    <h1>{name}</h1><p>{intro}</p></section><section class="section sector-reading">
    <aside><h2>Faaliyet alanları</h2><div class="topic-links">{topic_links(sector)}</div></aside>
    <div>{topics}<a class="line" href="{DESK}#sektor/{sector['image']}">Slovenya masasındaki ilgili dosya ↗</a></div></section>'''
    path = sector_url(sector)
    folder = OUT / path.strip('/')
    folder.mkdir(parents=True, exist_ok=True)
    (folder / 'index.html').write_text(shell(f'{name} | investors.com.tr', intro, path, body))
