"use client";
import { useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowUpRight,
  ChevronDown,
  ChevronRight,
  Focus,
  Minus,
  Plus,
  Share2,
} from "lucide-react";
import { photograph, sectorsInPrint, type Sector } from "../lib/editorial";
import { growth } from "../lib/growth";
const cx = 400,
  cy = 355,
  innerR = 118,
  outerR = 255;
function point(deg: number, r: number) {
  const t = (deg * Math.PI) / 180;
  return { x: cx + r * Math.cos(t), y: cy + r * Math.sin(t) };
}
function words(text: string, limit: number) {
  const lines: string[] = [""];
  for (const word of text.split(" ")) {
    const i = lines.length - 1;
    if (lines[i] && lines[i].length + word.length >= limit) lines.push(word);
    else lines[i] += (lines[i] ? " " : "") + word;
  }
  return lines;
}
function connect(a: number, b: number) {
  const src = point(-120 + a * 60, innerR),
    end = point(-144 + b * 20, outerR);
  const ctrl1 = point(-120 + a * 60, innerR + 65),
    ctrl2 = point(-144 + b * 20, outerR - 65);
  return `M ${src.x} ${src.y} C ${ctrl1.x} ${ctrl1.y}, ${ctrl2.x} ${ctrl2.y}, ${end.x} ${end.y}`;
}
type NodeSelection = { theme: number; tag?: number };
function Ring({
  s,
  selected,
  select,
}: {
  s: Sector;
  selected: NodeSelection | null;
  select: (v: NodeSelection | null) => void;
}) {
  const chapters = growth[s.id].chapters,
    centerText = words(
      s.short === "Yapısal çelik" ? "Yapısal çelik" : s.short,
      12,
    );
  const activate = (fn: () => void) => ({
    tabIndex: 0,
    role: "button",
    onClick: fn,
    onKeyDown: (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        fn();
      }
    },
  });
  const edges = chapters.flatMap((_, i) => [
    [i, i * 3],
    [i, i * 3 + 1],
    [i, i * 3 + 2],
    [i, ((i + 1) % chapters.length) * 3],
  ]);
  return (
    <svg
      className="ring"
      viewBox="10 -5 780 720"
      aria-label={s.name + " ilişki haritası"}
      role="group"
    >
      <defs>
        <clipPath id="hub-clip">
          <circle cx={cx} cy={cy} r="91" />
        </clipPath>
      </defs>
      <circle
        cx={cx}
        cy={cy}
        r={outerR}
        fill="none"
        stroke="#919197"
        strokeWidth="1.45"
      />
      {edges.map(([a, b]) => (
        <path
          key={a + "-" + b}
          d={connect(a, b)}
          fill="none"
          stroke={selected?.theme === a ? "#5995ff" : "#6a6a70"}
          opacity={selected && selected.theme !== a ? 0.37 : 0.93}
          strokeWidth={selected?.theme === a ? 2.25 : 1.15}
        />
      ))}
      <circle
        cx={cx}
        cy={cy}
        r={innerR}
        fill="none"
        stroke="#427cff"
        strokeWidth="2.7"
      />
      {chapters.flatMap(({ theme }, i) =>
        theme.slice(1).map((label, j) => {
          const n = i * 3 + j,
            angle = -144 + n * 20,
            p = point(angle, outerR),
            left = Math.cos((angle * Math.PI) / 180) < 0,
            lines = words(label, 15);
          const on = selected?.theme === i && selected.tag === j;
          return (
            <g
              key={n}
              className="ring-node"
              aria-label={label}
              aria-pressed={on}
              {...activate(() => select({ theme: i, tag: j }))}
            >
              <circle cx={p.x} cy={p.y} r="14" fill="transparent" />
              <circle
                cx={p.x}
                cy={p.y}
                r={on ? 8.7 : 7.5}
                fill={on ? "#356dff" : "#252529"}
                stroke="#eee"
                strokeWidth="1.5"
              />
              <g
                transform={`translate(${p.x} ${p.y}) rotate(${angle + (left ? 180 : 0)})`}
              >
                <text
                  x={left ? -15 : 15}
                  y={lines.length === 1 ? 4 : -3}
                  textAnchor={left ? "end" : "start"}
                  className="outer-text"
                >
                  {lines.map((line, k) => (
                    <tspan x={left ? -15 : 15} dy={k ? 14 : 0} key={line}>
                      {line}
                    </tspan>
                  ))}
                </text>
              </g>
            </g>
          );
        }),
      )}
      <g clipPath="url(#hub-clip)">
        <image
          href={photograph(s.id)}
          x={cx - 94}
          y={cy - 94}
          width="188"
          height="188"
          preserveAspectRatio="xMidYMid slice"
        />
        <circle cx={cx} cy={cy} r="94" fill="#000" opacity=".5" />
      </g>
      <g
        className="ring-node"
        {...activate(() => select(null))}
        aria-label={s.name + " genel görünüm"}
      >
        <circle cx={cx} cy={cy} r="91" fill="transparent" />
        <text
          x={cx}
          y={cy + 6 - (centerText.length - 1) * 10}
          textAnchor="middle"
          className="hub-text"
        >
          {centerText.map((line, i) => (
            <tspan key={line} x={cx} dy={i ? 23 : 0}>
              {line}
            </tspan>
          ))}
        </text>
      </g>
      {chapters.map(({ theme }, i) => {
        const p = point(-120 + i * 60, innerR),
          left = p.x < cx,
          x = p.x + (left ? -15 : 15),
          lines = words(theme[0], 12),
          on = selected?.theme === i;
        return (
          <g
            key={i}
            className="ring-node"
            {...activate(() => select({ theme: i }))}
            aria-label={theme[0]}
            aria-pressed={on}
          >
            <circle cx={p.x} cy={p.y} r="16" fill="transparent" />
            <circle
              cx={p.x}
              cy={p.y}
              r="10.8"
              fill={on ? "#306eff" : "#252528"}
              stroke="white"
              strokeWidth="1.7"
            />
            <text
              x={x}
              y={p.y + 5 - (lines.length - 1) * 8}
              textAnchor={left ? "end" : "start"}
              className="inner-text"
            >
              {lines.map((l, k) => (
                <tspan key={l} x={x} dy={k ? 17 : 0}>
                  {l}
                </tspan>
              ))}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
export function RelationshipMap({
  sector,
  change,
  back,
  dossier,
  start,
  initialPilot,
}: {
  sector: Sector;
  initialPilot: boolean;
  change: (id: string) => void;
  back: () => void;
  dossier: () => void;
  start: () => void;
}) {
  const [selected, select] = useState<NodeSelection | null>(null),
    [panel, setPanel] = useState(initialPilot ? 1 : 0),
    [zoom, setZoom] = useState(false),
    [shared, setShared] = useState(""),
    [manual, setManual] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const profile = growth[sector.id],
    theme = selected ? profile.chapters[selected.theme].theme : null;
  function pick(v: NodeSelection | null) {
    select(v);
    setPanel(0);
  }
  function enlarge() {
    setZoom(!zoom);
    requestAnimationFrame(() => {
      const el = ref.current;
      if (el) {
        el.scrollLeft = (el.scrollWidth - el.clientWidth) / 2;
        el.scrollTop = (el.scrollHeight - el.clientHeight) / 2;
      }
    });
  }
  async function share() {
    try {
      await navigator.clipboard.writeText(location.href);
      setShared("Bağlantı kopyalandı");
    } catch {
      setManual(true);
    }
  }
  return (
    <article className="dark-map">
      <div className="map-layout">
        <section className="map-canvas" aria-label="Bağlantılar">
          <div className="map-topline">
            <button className="map-pill" onClick={back}>
              <ArrowLeft size={16} /> Genel bakış
            </button>
            <label className="map-picker">
              <select
                aria-label="Haritada sektör seç"
                value={sector.id}
                onChange={(e) => change(e.target.value)}
              >
                {sectorsInPrint.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.short}
                  </option>
                ))}
              </select>
              <ChevronDown size={15} />
            </label>
          </div>
          <div
            ref={ref}
            className={"map-viewport" + (zoom ? " magnified" : "")}
          >
            <Ring s={sector} selected={selected} select={pick} />
          </div>
          <div className="map-bottom">
            <span>
              <i /> Karar başlığı <i /> Bağlantılı konu
            </span>
            <button onClick={enlarge} aria-pressed={zoom}>
              {zoom ? <Minus size={16} /> : <Plus size={16} />}{" "}
              {zoom ? "Küçült" : "Büyüt"}
            </button>
          </div>
        </section>
        <aside className="intelligence-panel">
          <div className="topic-cover">
            <img src={photograph(sector.id)} alt="" />
            <div>
              <small>SEKTÖR HARİTASI</small>
              <h1>{sector.name}</h1>
            </div>
          </div>
          <div className="topic-intro">
            <p>{profile.opening}</p>
            <button onClick={dossier} className="dark-link">
              Sektör geliştirme dosyasını oku <ArrowUpRight size={16} />
            </button>
            <div className="topic-tools">
              <button onClick={share}>
                <Share2 size={16} />
                {shared || "Bağlantıyı kopyala"}
              </button>
              <button onClick={start}>
                Dosya başlat <Plus size={15} />
              </button>
            </div>
            {manual && (
              <input
                className="share-url"
                readOnly
                aria-label="Sektör bağlantısı"
                value={location.href}
                onFocus={(e) => e.target.select()}
              />
            )}
          </div>
          <section className="browse">
            <h2>Haritayı incele</h2>
            <div className="dark-tabs">
              <button aria-pressed={panel === 0} onClick={() => setPanel(0)}>
                Karar başlıkları
              </button>
              <button aria-pressed={panel === 1} onClick={() => setPanel(1)}>
                Pilot çalışma
              </button>
            </div>
            {panel === 1 ? (
              <div className="briefing">
                <small>ÖNERİLEN PİLOT</small>
                <h3>{sector.pilot}</h3>
                <p>{profile.pilot[0]}</p>
                <button onClick={start}>
                  Değerlendirme başlat <ArrowUpRight size={16} />
                </button>
              </div>
            ) : (
              <>
                {selected && theme ? (
                  <div className="briefing" aria-live="polite">
                    <small>
                      {selected.tag === undefined
                        ? "KARAR BAŞLIĞI"
                        : "BAĞLANTILI KONU"}
                    </small>
                    <h3>
                      {selected.tag === undefined
                        ? theme[0]
                        : theme[selected.tag + 1]}
                    </h3>
                    <p>
                      {selected.tag === undefined
                        ? profile.chapters[selected.theme].body[0]
                        : profile.chapters[selected.theme].actions[
                            selected.tag
                          ]}
                    </p>
                    <button onClick={() => select(null)}>
                      Tüm başlıklara dön <Focus size={15} />
                    </button>
                  </div>
                ) : null}
                <div className="theme-list">
                  {profile.chapters.map(({ theme: [name, a, b, c] }, i) => (
                    <button
                      key={name}
                      aria-pressed={selected?.theme === i}
                      onClick={() => pick({ theme: i })}
                    >
                      <span>
                        <b>{name}</b>
                        <small>
                          {a} · {b} · {c}
                        </small>
                      </span>
                      <ChevronRight size={17} />
                    </button>
                  ))}
                </div>
              </>
            )}
          </section>
        </aside>
      </div>
    </article>
  );
}
