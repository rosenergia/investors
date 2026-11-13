"use client";
import { useRef, useState, type ReactNode } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Boxes,
  ChevronLeft,
  ChevronRight,
  FilePlus2,
  Menu,
  Plus,
  Search,
  X,
} from "lucide-react";
import { photograph, sectorsInPrint } from "../lib/editorial";
import { SloveniaBrief } from "./slovenia-brief";
import { MarketExplorer } from "./markets";
import { growth } from "../lib/growth";
type Route = "sector" | "home" | "guide" | "desk" | "map" | "intake";
export function Logo() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="16" cy="16" r="13" stroke="currentColor" />
      <ellipse
        cx="16"
        cy="16"
        rx="6.2"
        ry="13"
        transform="rotate(30 16 16)"
        stroke="currentColor"
      />
      <path d="M4 21 28 11M4 12l24 8" stroke="currentColor" />
    </svg>
  );
}
const catalogues = [
  "Sektörler",
  "Müşteriyi tanıma",
  "Pilot çalışmalar",
  "Çalışma masası",
];
export function Header({
  view,
  navigate,
  choose,
  read,
  pilot,
  newFile,
}: {
  view: string;
  navigate: (v: Route) => void;
  choose: (s: string) => void;
  read: (s: string) => void;
  pilot: (s: string) => void;
  newFile: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [category, setCategory] = useState(0),
    [query, setQuery] = useState("");
  const open = () => {
    setQuery("");
    setCategory(0);
    dialog.current?.showModal();
  };
  function closeAnd(action: () => void) {
    dialog.current?.close();
    action();
  }
  const term = query.trim().toLocaleLowerCase("tr");
  const records = sectorsInPrint.filter((s) =>
    [
      s.name,
      growth[s.id].headline,
      ...(category === 1
        ? s.questions
        : growth[s.id].chapters.flatMap((c) => [...c.theme, c.title])),
    ]
      .join(" ")
      .toLocaleLowerCase("tr")
      .includes(term),
  );
  const actions = [
    { text: "Firma başvurusu", fn: () => navigate("intake") },
    { text: "Yeni değerlendirme", fn: newFile },
    { text: "Dosyalarım", fn: () => navigate("desk") },
  ].filter((x) => x.text.toLocaleLowerCase("tr").includes(term));
  return (
    <header className="journal-header">
      <div className="journal-bar">
        <button className="menu-trigger" aria-label="Menüyü aç" onClick={open}>
          <span className="menu-symbol">
            <Menu size={25} />
            <Search size={13} />
          </span>
          <span>Menü ve arama</span>
        </button>
        <button
          className="journal-brand"
          aria-label="investors.com.tr Slovenya ana sayfa"
          onClick={() => navigate("home")}
        >
          <Logo />
          <span>
            investors.com.tr<small>SLOVENYA</small>
          </span>
        </button>
        <div className="journal-actions">
          <button className="round blue" onClick={() => navigate("intake")}>
            <Plus size={15} />
            Firma başvurusu
          </button>
          <button className="round border" onClick={() => navigate("desk")}>
            Dosyalarım
          </button>
        </div>
      </div>
      <nav className="journal-nav" aria-label="Ana gezinme">
        {(
          [
            ["home", "Brifing masası"],
            ["sector", "Sektör geliştirme"],
            ["map", "İlişki haritası"],
            ["guide", "Müşteriyi tanıma"],
          ] as const
        ).map(([v, label]) => (
          <button
            key={v}
            aria-current={view === v ? "page" : undefined}
            onClick={() => navigate(v)}
          >
            {label}
          </button>
        ))}
      </nav>
      <dialog
        ref={dialog}
        className="directory"
        aria-label="Menü ve arama"
        onClick={(e) => {
          if (e.target === dialog.current) dialog.current?.close();
        }}
      >
        <div className="directory-sheet">
          <div className="directory-search">
            <button
              aria-label="Menüyü kapat"
              onClick={() => dialog.current?.close()}
            >
              <X />
            </button>
            <Search />
            <input
              autoFocus
              type="search"
              aria-label="Menüde ara"
              placeholder="Sektör, konu veya dosya ara"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <div className="directory-body">
            <div className="dir-cats">
              {catalogues.map((c, i) => (
                <button
                  key={c}
                  aria-pressed={category === i}
                  onClick={() => setCategory(i)}
                >
                  {c}
                  <ChevronRight size={18} />
                </button>
              ))}
            </div>
            <div className="dir-results" aria-live="polite">
              {category < 3
                ? records.map((s) => (
                    <button
                      key={s.id}
                      onClick={() =>
                        closeAnd(() =>
                          category === 0
                            ? choose(s.id)
                            : category === 1
                              ? read(s.id)
                              : pilot(s.id),
                        )
                      }
                    >
                      <img src={photograph(s.id)} alt="" />
                      <span>
                        <small>
                          {
                            ["SEKTÖR", "MÜŞTERİYİ TANIMA", "PİLOT ÇALIŞMA"][
                              category
                            ]
                          }
                        </small>
                        <strong>{category === 2 ? s.pilot : s.name}</strong>
                      </span>
                      <ChevronRight size={16} />
                    </button>
                  ))
                : actions.map((a) => (
                    <button key={a.text} onClick={() => closeAnd(a.fn)}>
                      <img src={photograph("harbor")} alt="" />
                      <span>
                        <small>ÇALIŞMA MASASI</small>
                        <strong>{a.text}</strong>
                      </span>
                      <ChevronRight size={16} />
                    </button>
                  ))}
              {(category === 3 ? !actions.length : !records.length) && (
                <p>Bu kategoride eşleşme bulunamadı.</p>
              )}
            </div>
          </div>
        </div>
      </dialog>
    </header>
  );
}
const editions = [
  {
    label: "Sektör dosyaları",
    headline: "Avrupa’da hangi müşteriye, hangi teklifle ulaşabilirsiniz?",
    body: "Adriyatik’ten Orta Avrupa’ya altı sektörde alıcı kanalları, teslim modelleri ve finansman seçenekleri.",
    cta: "Sektör analizini oku",
  },
  {
    label: "İlişki haritaları",
    headline: "Bir sektörde büyümeyi belirleyen bağlantılar.",
    body: "Alıcı kanalından işletme sermayesine, seçtiğiniz konunun ticari karşılığını haritada inceleyin.",
    cta: "İlişki haritasını aç",
  },
  {
    label: "Pilotlar",
    headline: "Yatırımdan önce modeli bir siparişte deneyin.",
    body: "Tek bir ürün veya projede doğrudan teslim ile hedef pazarda bir ortakla çalışmanın sonucunu karşılaştırın.",
    cta: "Pilot planını incele",
  },
];
export function Home({
  map,
  dossier,
  begin,
  pilot,
  intake,
  draftNotice,
}: {
  map: (id: string) => void;
  dossier: (id: string) => void;
  begin: () => void;
  pilot: (id: string) => void;
  intake: () => void;
  draftNotice: ReactNode;
}) {
  const [tab, setTab] = useState(0),
    [slide, setSlide] = useState(0);
  const track = useRef<HTMLDivElement>(null);
  const ed = editions[tab];
  function jump(i: number, instant = false) {
    const rail = track.current,
      el = rail?.children[i] as HTMLElement | undefined;
    if (!rail || !el) return;
    rail.scrollTo({
      left: el.offsetLeft - (rail.children[0] as HTMLElement).offsetLeft,
      behavior:
        instant || window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
    });
  }
  function sync() {
    const rail = track.current;
    if (!rail) return;
    const first = (rail.children[0] as HTMLElement).offsetLeft;
    let best = 0;
    for (let i = 1; i < sectorsInPrint.length; i++)
      if (
        Math.abs(
          (rail.children[i] as HTMLElement).offsetLeft -
            first -
            rail.scrollLeft,
        ) <
        Math.abs(
          (rail.children[best] as HTMLElement).offsetLeft -
            first -
            rail.scrollLeft,
        )
      )
        best = i;
    setSlide(best);
  }
  const changeTab = (i: number) => {
    setTab(i);
    jump(0, true);
    setSlide(0);
  };
  return (
    <div className="editorial-home">
      {draftNotice}
      <SloveniaBrief open={dossier} />
      <section className="lead-edition">
        <div className="page-gutter">
          <h2 className="si-library-title">Araştırma dosyaları</h2>
          <div className="pills" aria-label="Keşif kategorileri">
            {editions.map((e, i) => (
              <button
                key={e.label}
                aria-pressed={i === tab}
                onClick={() => changeTab(i)}
              >
                {e.label}
              </button>
            ))}
          </div>
          <div className="edition-deck">
            <h2>{ed.headline}</h2>
            <p>{ed.body}</p>
          </div>
          <button
            className="plain-link"
            onClick={() =>
              tab === 0
                ? dossier(sectorsInPrint[slide].id)
                : tab === 1
                  ? map(sectorsInPrint[slide].id)
                  : pilot(sectorsInPrint[slide].id)
            }
          >
            {ed.cta}
            <ChevronRight />
          </button>
        </div>
        <div
          className="gallery"
          aria-label={ed.label}
          ref={track}
          onScroll={sync}
        >
          {sectorsInPrint.map((s) => (
            <button
              className="gallery-card"
              key={s.id}
              onClick={() =>
                tab === 0 ? dossier(s.id) : tab === 1 ? map(s.id) : pilot(s.id)
              }
            >
              <img src={photograph(s.id)} alt="" draggable={false} />
              <span className="glass" />
              <span className="card-title">
                {tab === 0
                  ? s.name
                  : tab === 1
                    ? growth[s.id].chapters[0].title
                    : s.pilot}
              </span>
              <span className="card-open">
                <ArrowUpRight size={19} />
              </span>
            </button>
          ))}
        </div>
        <div className="gallery-controls page-gutter">
          <div className="dots">
            {sectorsInPrint.map((s, i) => (
              <button
                key={s.id}
                aria-label={s.short + " kartına geç"}
                aria-current={slide === i ? "true" : undefined}
                onClick={() => jump(i)}
              >
                <span />
              </button>
            ))}
          </div>
          <div className="arrows">
            <button
              disabled={slide === 0}
              aria-label="Önceki kart"
              onClick={() => jump(Math.max(0, slide - 1))}
            >
              <ChevronLeft />
            </button>
            <button
              disabled={slide === sectorsInPrint.length - 1}
              aria-label="Sonraki kart"
              onClick={() =>
                jump(Math.min(sectorsInPrint.length - 1, slide + 1))
              }
            >
              <ChevronRight />
            </button>
          </div>
        </div>
      </section>
      <MarketExplorer dossier={dossier} />
      <section className="spotlight page-gutter">
        <div className="spot-head">
          <h2>Mercek altında</h2>
          <button className="plain-link" onClick={begin}>
            Çalışma masası <ChevronRight />
          </button>
        </div>
        <p>
          Tekstilde ilk siparişi düzenli ikmale dönüştüren ticari modeli
          inceleyin.
        </p>
        <div className="feature-split">
          <button className="feature-story" onClick={() => dossier("tekstil")}>
            <img src={photograph("tekstil")} alt="" />
            <span>
              <small>TEKSTİL VE HAZIR GİYİM</small>Bir beden eksildiğinde
              siparişi kim kazanır?
            </span>
            <ArrowUpRight />
          </button>
          <button className="feature-blue" onClick={intake}>
            <small>FİRMA BAŞVURUSU</small>
            <strong>
              Avrupa’da işinizi büyütürken hangi engelle karşılaşıyorsunuz?
            </strong>
            <span>
              Firmanız için başvurun <ArrowRight size={21} />
            </span>
          </button>
        </div>
      </section>
    </div>
  );
}
export function FileChooser({
  onStart,
  resume,
}: {
  onStart: (m: string) => void;
  resume?: () => void;
}) {
  return (
    <div className="choose-page">
      <div className="kicker">
        <span /> ÜRÜN VE PROJE MASASI
      </div>
      <h1 className="innerTitle">Yeni değerlendirme</h1>
      <p>
        Karşılaştırmak istediğiniz işi seçin. İlk görüşme için firma takma adı
        kullanabilirsiniz.
      </p>
      {resume && (
        <div className="resume">
          Bu sekmede açık bir taslağınız var. Yeni dosya açarsanız bu taslak
          değişir.<button onClick={resume}>Taslağa dön →</button>
        </div>
      )}
      <div className="work-cards">
        <button onClick={() => onStart("Ürün")}>
          <Boxes />
          <span>
            <b>Bir ürünüm var</b>
            <small>Sipariş, teslimat ve stok hesabı</small>
          </span>
          <ArrowRight />
        </button>
        <button onClick={() => onStart("Proje")}>
          <FilePlus2 />
          <span>
            <b>Bir projem var</b>
            <small>Kapsam, iş programı ve saha hesabı</small>
          </span>
          <ArrowRight />
        </button>
      </div>
    </div>
  );
}
