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
insights = json.loads((ROOT / 'insights.json').read_text())

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
        'yayinlar': ('Genel bakış', [
            menu_item('/genel-bakis/', 'Tüm genel bakış yazıları', 'Ücretsiz yayınlar', code='↗'),
            *[menu_item('/genel-bakis/' + item['slug'] + '/', item['title'], item['topic'], image=item['image']) for item in insights],
            menu_item('/yayin-ilkeleri/', 'Yayın ve erişim ilkeleri', 'Hakkımızda', code='i'),
        ]),
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
        active = key == 'yayinlar'
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
    links='<a href="/genel-bakis/">Genel bakış</a><a href="/#sektorler">Sektörler</a><a href="/#ulkeler">Ülkeler</a><a href="/yayin-ilkeleri/">Yayın ilkeleri</a>'
    return f'''<!doctype html>
<html lang="tr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>{escape(title)}</title><meta name="description" content="{escape(desc,quote=True)}"><link rel="canonical" href="{BASE}{path}"><meta property="og:title" content="{escape(title,quote=True)}"><meta property="og:image" content="{BASE}/media/harbor.webp"><link rel="icon" href="/globe.svg"><link rel="stylesheet" href="{asset_url('style.css')}"><link rel="stylesheet" href="{asset_url('footer.css')}"><script defer src="{asset_url('site.js')}"></script></head><body>
<a class="skip" href="#icerik">İçeriğe geç</a><header><div class="mast"><button id="menu" aria-haspopup="dialog" aria-expanded="false" aria-controls="drawer"><span class="hamb" aria-hidden="true"></span>Menü</button>{brand}<a class="desk" href="{DESK}">Slovenya masası <span>↗</span></a></div><nav aria-label="Ana gezinme"><a href="/" {'aria-current="page"' if path=='/' else ''}>Ana sayfa</a>{links}</nav></header>
{site_menu(path)}
<main id="icerik">{body}</main>{(ROOT / 'footer.html').read_text()}</body></html>'''
def country_links():
    return ''.join(f'<a href="/ulkeler/{slug}/"><span class="code">{code}</span><span>{name}</span><span class="arrow">→</span></a>' for code,name,slug,*_ in countries)
cards = ''.join(sector_card(sector) for sector in sector_directory)
def insight_cards():
    return ''.join(f'<article class="insight-card" data-topic="{escape(item["topic"])}">'
                   f'<a href="/genel-bakis/{item["slug"]}/"><img loading="lazy" src="/media/{item["image"]}.webp" alt="">'
                   f'<div><small>{escape(item["topic"])}</small><h3>{escape(item["title"])}</h3>'
                   f'<p>{escape(item["summary"])}</p><span class="read-link">Genel bakışı oku →</span></div></a></article>'
                   for item in insights)

home=f'''<section class="hero"><div class="hero-copy"><p class="eyebrow"><i></i> Ücretsiz genel bakış ve analiz</p><h1>Avrupa’yı anlamak.<br>Kararları<br>hazırlamak.</h1><p>Üretim, finansman ve ticaret üzerine kaynaklı değerlendirmeler. Fırsatları, maliyetleri ve belirsizlikleri birlikte inceleyin.</p><a class="line" href="/genel-bakis/">Genel bakış yazılarını keşfet <b>↓</b></a></div><figure><img src="/media/harbor.webp" fetchpriority="high" alt="Konteyner terminalinde yükleme vinçleri ve gemilere havadan bakış"><figcaption><span>Dosya odağı</span> Avrupa’da dağıtım</figcaption></figure></section>
<div class="access-note">Genel bakış yazıları ve brifingler ücretsiz, üyelik gerektirmeden okunabilir. <a href="/yayin-ilkeleri/">Yayın yaklaşımımız ↗</a></div>
<section class="section insights" id="genel-bakis"><div class="sectionhead"><h2>Genel bakış</h2><p>Bir ticari kararın arkasındaki koşulları ve izlenecek göstergeleri okuyun.</p></div><div class="insight-grid">{insight_cards()}</div><a class="line" href="/genel-bakis/">Tüm yazılar <b>→</b></a></section>
<section class="section countries" id="ulkeler"><div class="sectionhead"><h2>Ülke brifingleri</h2><p>Hedef pazarı seçin. Alıcı profillerini ve sektörünüze uygun ilk saha denemesini inceleyin.</p></div><div class="countrygrid"><article class="featured"><small><i></i> Yayındaki ülke masası</small><div><h3>Slovenya</h3><p>Slovenya’yı merkez alarak Avrupa’da ihale, EPC, finansman ve üretim seçeneklerini bir proje üzerinden değerlendirin.</p></div><a class="line" href="{DESK}">Slovenya masasına git <b>↗</b></a></article><div class="directory">{country_links()}</div></div></section>
<section class="section sectors" id="sektorler"><div class="sectionhead"><h2>Sektör brifingleri</h2><p>Sektörünüzü veya faaliyet alanınızı seçerek teklif kapsamını, alıcı beklentilerini ve teslim koşullarını inceleyin.</p></div><div class="stories">{cards}</div></section>
<section class="section about" id="yaklasim"><div><small>investors.com.tr hakkında</small><h2>Bilgiye açık erişim.<br>Şeffaf değerlendirme.</h2></div><div><p>investors.com.tr, Avrupa’da iş geliştiren firmalar için ücretsiz genel bakış yazıları ve brifingler yayımlar. Kaynakları, değerlendirme tarihini ve öngörülerin hangi koşullara bağlı olduğunu görünür kılar. Okuyucu kendi pazar ve şirket verileriyle değerlendirmeyi ilerletebilir.</p><a class="line" href="/yayin-ilkeleri/">Yayın ve erişim ilkelerini okuyun <b>↗</b></a></div></section>'''
(OUT/'index.html').write_text(shell('investors.com.tr | Avrupa üzerine ücretsiz analiz ve brifingler','Avrupa’da iş geliştiren firmalar için ücretsiz genel bakış yazıları, sektör dosyaları ve ülke brifingleri.','/',home))
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

def publish(path, title, desc, content):
    folder = OUT / path.strip('/')
    folder.mkdir(parents=True, exist_ok=True)
    (folder / 'index.html').write_text(shell(title + ' | investors.com.tr', desc, path, content))

filters = ''.join(f'<option>{escape(topic)}</option>' for topic in dict.fromkeys(item['topic'] for item in insights))
publish('/genel-bakis/', 'Genel bakış', 'Ücretsiz ve açık erişimli finansman, üretim ve tedarik zinciri değerlendirmeleri.',
    f'''<section class="countryhero"><small>investors.com.tr / Yayınlar</small><h1>Genel bakış</h1>
    <p>Avrupa’da iş geliştirmeyi etkileyen koşullar, olası gelişmeler ve izlenecek göstergeler.</p></section>
    <section class="section"><p class="library-access">Yazıların tamamı ücretsiz ve üyelik gerektirmeden okunabilir.</p>
    <div class="library-tools"><label>Yazılarda ara<input id="insight-search" type="search" placeholder="Nakit akışı, stok, üretim…" autocomplete="off"></label>
    <label>Konu<select id="insight-topic" aria-label="Konu"><option value="">Tüm konular</option>{filters}</select></label></div>
    <p id="insight-count" role="status">{len(insights)} yazı</p><div class="insight-grid" id="insight-results">{insight_cards()}</div>
    <p id="insight-empty" hidden>Bu aramaya uygun yazı bulunamadı. Başka bir kelime deneyebilirsiniz.</p></section>''')
for item in insights:
    content = ''.join(f'<section id="bolum-{index}"><h2>{escape(title)}</h2><p>{escape(text)}</p></section>' for index,(title,text) in enumerate(item['sections']))
    anchors = ''.join(f'<a href="#bolum-{index}">{escape(title)}</a>' for index,(title,_) in enumerate(item['sections']))
    sources = ''.join(f'<li><a href="{escape(url, quote=True)}" target="_blank" rel="noreferrer">{escape(label)} ↗</a></li>' for label,url in item['sources'])
    publish('/genel-bakis/' + item['slug'] + '/', item['title'], item['summary'],
        f'''<section class="article-heading"><a href="/genel-bakis/">← Genel bakış</a><p class="eyebrow">{escape(item['topic'])}</p>
        <h1>{escape(item['title'])}</h1><p class="article-deck">{escape(item['summary'])}</p>
        <p class="article-meta">Hazırlayan investors.com.tr · <time datetime="{item.get('date', '2026-11-14')}">{item.get('dateLabel', '14 Kasım 2026')}</time> · Açık erişim</p></section>
        <div class="article-layout section"><aside aria-label="Yazının bölümleri">{anchors}<a href="#kaynaklar">Kaynaklar</a></aside>
        <article class="article-copy">{content}<p class="editorial-note">Koşullara bağlı öngörü, investors.com.tr editoryal değerlendirmesidir. Kaynaklar aşağıda yer alır.</p>
        <section id="kaynaklar"><h2>Kaynaklar</h2><ul>{sources}</ul></section>
        <a class="line" href="{item['related']}">{escape(item['relatedLabel'])} →</a></article></div>''')
publish('/yayin-ilkeleri/', 'Yayın ve erişim ilkeleri', 'Ücretsiz bilgiye erişim, kaynaklar, öngörüler ve firmaya özel çalışmalar için yaklaşımımız.',
    '''<section class="countryhero"><small>investors.com.tr hakkında</small><h1>Yayın ve erişim ilkeleri</h1><p>Avrupa’da iş geliştiren firmalar için bilginin erişilebilir ve değerlendirmenin izlenebilir olması.</p></section>
    <article class="section policy-copy">
    <section><h2>Ücretsiz bilgiye erişim</h2><p>Genel bakış yazıları, sektör dosyaları ve ülke brifingleri ücretsiz olarak okunabilir. Bu yayınlara erişim üyelik veya firma başvurusu gerektirmez. Açık bilgiye erişim, yayın yaklaşımımızın temelidir.</p></section>
    <section><h2>Kaynak ve değerlendirme</h2><p>Genel bakış yazılarında resmî kaynak bağlantıları, hazırlayan bilgisi ve yayın tarihi yer alır. Öngörüler, gerçekleşmelerini etkileyen koşullarla birlikte sunulur. Ülke ve sektör brifinglerindeki örnek alıcı profilleri ve saha denemeleri, firmanın kendi verileriyle sınayabileceği çalışma çerçeveleridir.</p></section>
    <section><h2>İçerik nasıl okunmalı?</h2><p>Genel değerlendirmeler, belirli bir firmaya ilişkin inceleme için başlangıç sağlar. Bir finansman, sigorta veya ihale kararında ilgili ürünün güncel koşulları ve somut işin belgeleri belirleyicidir. Kaynakların yayın tarihleri ve sonraki değişiklikler birlikte değerlendirilmelidir.</p></section>
    <section><h2>Firmaya özel çalışmalar</h2><p>İleride firmanın kendi verileriyle hazırlanacak fizibilite, pazar araştırması veya proje değerlendirmesi gibi çalışmalar ücretli olarak sunulabilir. Böyle bir çalışmada kapsam, teslim edilecek çıktı, hizmeti sunacak taraf ve ücret, başlamadan önce yazılı olarak açıklanır ve firmanın onayına sunulur. Genel yayınlara ücretsiz erişim sürer.</p></section>
    <section><h2>Yayıncı</h2><p>investors.com.tr, Orta Avrupa ve Slovenya Yatırım İnisiyatifi kapsamında hazırlanan bir bilgi ve brifing platformudur. Ülke dosyalarına ve Slovenya Brifing Masası’na site menüsünden ulaşabilirsiniz.</p></section>
    <a class="line" href="/genel-bakis/">Ücretsiz yayınları inceleyin →</a></article>''')
