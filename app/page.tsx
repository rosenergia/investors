"use client";
import { useEffect, useState, useRef } from "react";
import { sectors, common, guide } from "../lib/content";
import {
  blank,
  assess,
  costs,
  Entry,
  methodNames,
  isEntry,
  sources,
  stages,
  valid,
} from "../lib/assessment";
import { SectorDevelopment } from "./sector-development";
import { RelationshipMap } from "./relationship-map";
import { discoveryGuide } from "../lib/discovery";
import { Discovery } from "./discovery";
import { Intake, IntakeSummary } from "./intake";
import { Header, Home, FileChooser, Logo } from "./atlas";
import { BriefFields, BriefReport, PilotFields } from "./project-brief";
import { atlas } from "../lib/atlas";
type FileRow = {
  id: string;
  created: number;
  revision: number;
  payload: Entry;
  stage: string;
  assignee: string;
  due: string;
  task: string;
  canReview: boolean;
};
import { CompanyBrief } from "./company-brief";

type View =
  | "company"
  | "intake"
  | "sector"
  | "map"
  | "new"
  | "home"
  | "entry"
  | "desk"
  | "guide"
  | "report";
const tr = new Intl.NumberFormat("tr-TR", { maximumFractionDigits: 2 });
const eur = (n: number) => tr.format(n) + " €";
const signals = [
  "Henüz görüşülmedi",
  "Alıcıyla görüşüldü",
  "Teklif talebi var",
  "Sipariş veya sözleşme var",
];
const steps = ["Firma ve fırsat", "Müşteriyi tanıma", "Ticari hesap"];
const index = (i: number) => String(i + 1).padStart(2, "0");
async function api(method: string, body?: unknown) {
  const r = await fetch("/api/desk", {
    method,
    cache: "no-store",
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  const j = (await r.json()) as {
    error?: string;
    invite: string;
    cases: FileRow[];
    token: string;
  };
  if (!r.ok) throw new Error(j.error || "İşlem tamamlanamadı. Tekrar deneyin.");
  return j;
}
function Field({
  label,
  value,
  onChange,
  options,
  required = false,
  placeholder = "",
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options?: string[];
  required?: boolean;
  placeholder?: string;
  type?: string;
}) {
  return (
    <label className="field">
      <span>
        {label}
        {required ? " *" : ""}
      </span>
      {options ? (
        <select value={value} onChange={(e) => onChange(e.target.value)}>
          {options.map((x) => (
            <option key={x}>{x}</option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          maxLength={2000}
          value={value}
          required={required}
          pattern={required && type === "text" ? ".*\\S.*" : undefined}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
        />
      )}
    </label>
  );
}
function Report({ p }: { p: Entry }) {
  if (p.kind === "intake") return <IntakeSummary p={p} />;
  const rowNames = methodNames(p);
  const a = assess(p);
  return (
    <div className="report">
      <div className="eyebrow">
        <b /> KARAR NOTU
      </div>
      <h1>{p.offer || "Ön değerlendirme"}</h1>
      <p>
        {p.firm} · {a.sector.name} · {p.market}
      </p>
      <div className="decision">
        <small>ÖNERİLEN KARAR</small>
        <h2>{a.verdict}</h2>
        <p>{a.next}</p>
      </div>
      <div className="metrics">
        {[...rowNames, "Katkı farkı"].map((n, i) => (
          <div key={n}>
            <small>{n}</small>
            <strong>
              {[...a.totals, a.diff][i] === null
                ? "Eksik veri"
                : eur([...a.totals, a.diff][i]!)}
            </strong>
          </div>
        ))}
      </div>
      <p className="muted">
        Katkı = (birim satış − birim maliyetler) × miktar − döneme ait ek sabit
        gider. Vergi ve ayrıca girilmeyen finansman giderleri hesap dışında.
      </p>
      {a.diff !== null && (
        <p>
          {rowNames[1]} için satış fiyatı %10 düşerse, diğer koşullar sabitken
          katkı farkı{" "}
          <b>
            {eur(
              a.diff -
                0.1 *
                  Number(p.rows[1][0].replace(",", ".")) *
                  Number(p.volume.replace(",", ".")),
            )}
          </b>{" "}
          olur.
        </p>
      )}
      {a.equality && <p>{a.equality}</p>}
      {a.crossing && (
        <p>
          İki yöntemin eşitlendiği hacim yaklaşık{" "}
          <b>
            {tr.format(a.crossing.volume)} {p.unit.toLocaleLowerCase("tr")}
          </b>
          . Diğer koşullar sabitken {rowNames[1]} bu hacmin{" "}
          {a.crossing.above ? "üstünde" : "altında"} avantajlı.
        </p>
      )}
      <details open>
        <summary>Dosya ve hesap dayanakları</summary>
        <dl>
          {Object.entries({
            İrtibat: p.contact,
            "Hedef alıcı": p.buyer,
            "Talep düzeyi": p.signal,
            "Ticari engel": p.barrier,
            "Teslim kapsamı": p.scope,
            "Miktar ve dönem": [p.volume, p.unit, p.period]
              .filter(Boolean)
              .join(" · "),
            "Mevcut yöntemde bağlanan sermaye": p.capitalNow
              ? eur(Number(p.capitalNow.replace(",", ".")))
              : "",
            [rowNames[1] + " · bağlanan sermaye"]: p.capitalSI
              ? eur(Number(p.capitalSI.replace(",", ".")))
              : "",
            "Mevcut yöntem dayanağı": p.sources[0],
            [rowNames[1] + " · dayanak"]: p.sources[1],
            "İnisiyatifin birim hizmet bedeli": p.rows[1][3]
              ? eur(Number(p.rows[1][3].replace(",", ".")))
              : "",
            "İnisiyatifin birim hizmet maliyeti": p.deliveryCost
              ? eur(Number(p.deliveryCost.replace(",", ".")))
              : "",
            "İnisiyatifin hizmet katkısı (dönem)":
              p.deliveryCost && p.rows[1][3] && p.volume
                ? eur(
                    (Number(p.rows[1][3].replace(",", ".")) -
                      Number(p.deliveryCost.replace(",", "."))) *
                      Number(p.volume.replace(",", ".")),
                  )
                : "",
          }).map(([k, v]) => (
            <div key={k}>
              <dt>{k}</dt>
              <dd>{v || "Henüz belirtilmedi"}</dd>
            </div>
          ))}
        </dl>
        <div className="tablewrap">
          <table>
            <thead>
              <tr>
                <th>EUR</th>
                {rowNames.map((n) => (
                  <th key={n}>{n}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {costs.map((n, i) => (
                <tr key={n}>
                  <td>{n}</td>
                  {p.rows.map((r, j) => (
                    <td key={j}>
                      {r[i] || "—"}
                      {r[i] && (
                        <small className="value-source">
                          {p.lineSources?.[j]?.[i] || p.sources[j]}
                        </small>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
      <BriefReport p={p} />
      {p.answers.some((a) => a.trim()) && (
        <details open>
          <summary>Müşteriyi tanıma notları</summary>
          <dl>
            {a.sector.questions.map(
              (q, i) =>
                p.answers[i]?.trim() && (
                  <div key={q}>
                    <dt>{q}</dt>
                    <dd>{p.answers[i] || "Görüşmede netleştirilecek"}</dd>
                  </div>
                ),
            )}
          </dl>
        </details>
      )}
    </div>
  );
}
export default function Page() {
  const [offline, setOffline] = useState(false);
  const [view, setView] = useState<View>("home"),
    [p, setP] = useState<Entry>(blank),
    [step, setStep] = useState(0),
    [id, setId] = useState(""),
    [draft, setDraft] = useState(false),
    [ready, setReady] = useState(false),
    [invite, setInvite] = useState(""),
    [ownLink, setLink] = useState(""),
    [files, setFiles] = useState<FileRow[]>([]),
    [current, setCurrent] = useState<FileRow | null>(null),
    [busy, setBusy] = useState(false),
    [msg, setMsg] = useState(""),
    [filter, setFilter] = useState(""),
    [chosen, setChosen] = useState("tekstil"),
    [rule, setRule] = useState(false);
  const [initialProfile, setInitialProfile] = useState<{sector:string; activity:string; projectRole:string}>();
  const rowNames = methodNames(p);
  const [pendingMode, setPendingMode] = useState("");
  const sector = sectors.find((s) => s.id === p.sector)!,
    selected = sectors.find((s) => s.id === chosen)!;
  useEffect(() => {
    setOffline(location.protocol === "file:");
    const i = new URLSearchParams(location.search).get("davet") || "";
    setInvite(i);
    try {
      const raw = sessionStorage.getItem("slovenija-form:" + i);
      if (raw) {
        const x = JSON.parse(raw);
        if (
          sectors.some((s) => s.id === x.p?.sector) &&
          Array.isArray(x.p.answers) &&
          Array.isArray(x.p.rows) &&
          x.id
        ) {
          setP({ ...blank(), regionalModel: "Slovenya modeli", ...x.p });
          setId(x.id);
          setStep(Math.min(2, Math.max(0, Number(x.step) || 0)));
          setDraft(true);
        }
      }
    } catch {}
    setReady(true);
  }, []);
  useEffect(() => {
    if (ready && draft && id) {
      try {
        sessionStorage.setItem(
          "slovenija-form:" + invite,
          JSON.stringify({ p, id, step }),
        );
      } catch {}
    }
  }, [p, id, step, draft, ready, invite]);
  function navigate(v: View, push = true, slug?: string) {
    const hash =
      slug ||
      {
        home: "genel-bakis",
        company: "slovenya-sirketi",
        intake: "basvuru",
        sector: "sektor/" + chosen,
        map: "harita/" + chosen,
        guide: "musteriyi-tanima/" + chosen,
        desk: "dosyalar",
        new: "yeni",
        entry: "degerlendirme",
        report: "karar-notu",
      }[v];
    if (push && location.hash.slice(1) !== hash)
      history.pushState(null, "", "#" + hash);
    setView(v);
    setMsg("");
    window.scrollTo(0, 0);
  }
  const [initialPilot, setInitialPilot] = useState(false);
  const nav = (v: View) => navigate(v);
  const restore = useRef<() => void>(() => {});
  restore.current = () => {
    const [route, key, section] = location.hash.slice(1).split("/");
    if (route === "basvuru" || (!route && invite)) navigate("intake", false);
    else if (route === "slovenya-sirketi") navigate("company", false);
    else if (route === "sektor") {
      setChosen(sectors.some((s) => s.id === key) ? key : "tekstil");
      navigate("sector", false);
    } else if (route === "harita") {
      setInitialPilot(section === "pilot");
      setChosen(sectors.some((s) => s.id === key) ? key : "celik");
      navigate("map", false);
    } else if (route === "rehber" || route === "musteriyi-tanima") {
      if (sectors.some((s) => s.id === key)) setChosen(key);
      setRule(false);
      navigate("guide", false);
    } else if (route === "dosyalar") void desk(false);
    else if (route === "yeni") navigate("new", false);
    else if (route === "degerlendirme" && draft) navigate("entry", false);
    else if (route === "karar-notu" && (current || p.offer))
      navigate("report", false);
    else navigate("home", false);
  };
  useEffect(() => {
    if (!ready) return;
    const handle = () => restore.current();
    handle();
    window.addEventListener("popstate", handle);
    return () => window.removeEventListener("popstate", handle);
  }, [ready]);
  function openSector(id: string) {
    setChosen(id);
    navigate("sector", true, "sektor/" + id);
  }
  function openMap(id: string, pilot = false) {
    setInitialPilot(pilot);
    setChosen(id);
    navigate("map", true, "harita/" + id + (pilot ? "/pilot" : ""));
  }
  function openGuide(key: string) {
    setChosen(key);
    setRule(false);
    navigate("guide", true, "musteriyi-tanima/" + key);
  }
  function begin() {
    setPendingMode("");
    nav("new");
  }
  function offerStart(mode: string, key: string) {
    setChosen(key);
    if (draft) {
      setPendingMode(mode);
      nav("new");
    } else start(mode, key);
  }

  function start(mode: string, sectorId = chosen) {
    const target = sectors.find((s) => s.id === sectorId) || sectors[0];
    setPendingMode("");
    setP({
      ...blank(),
      sector: target.id,
      mode,
      invite,
      unit: mode === "Proje" ? "Proje" : target.unit,
      period: mode === "Proje" ? "Bir proje" : "Bir sipariş",
    });
    setId(crypto.randomUUID());
    setDraft(true);
    setCurrent(null);
    setStep(0);
    nav("entry");
  }
  function change(k: keyof Entry, v: string) {
    setP((old) => ({ ...old, [k]: v }));
  }
  const field = (
    label: string,
    key: keyof Entry,
    extra: Partial<Parameters<typeof Field>[0]> = {},
  ) => (
    <Field
      label={label}
      value={p[key] as string}
      onChange={(v) => change(key, v)}
      {...extra}
    />
  );
  async function desk(push = true) {
    navigate("desk", push);
    setFiles([]);
    setLink("");
    if (offline) {
      setMsg(
        "Kalıcı dosyaları ve firma davetlerini kullanmak için paketteki sunucuyu başlatın.",
      );
      return;
    }
    setBusy(true);
    try {
      const j = await api("GET");
      setFiles(j.cases);
      setLink(j.invite);
    } catch (e) {
      setMsg((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  async function saveIntake(id: string, entry: Entry) {
    await api("POST", { id, entry });
  }
  async function importIntake(file: File) {
    setMsg("");
    setBusy(true);
    try {
      if (file.size > 150000) throw new Error("Başvuru dosyası çok büyük.");
      let record;
      try {
        record = JSON.parse(await file.text());
      } catch {
        throw new Error("Firma formunun indirdiği JSON dosyasını seçin.");
      }
      if (
        !record ||
        typeof record.id !== "string" ||
        !isEntry(record.entry) ||
        record.entry.kind !== "intake"
      ) {
        throw new Error("Seçilen dosya geçerli bir firma başvurusu içermiyor.");
      }
      await saveIntake(record.id, { ...record.entry, invite: "" });
      const result = await api("GET");
      setFiles(result.cases);
      setMsg("Firma başvurusu Dosyalarım bölümünde açılmaya hazır.");
    } catch (e) {
      setMsg((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  async function createLink() {
    setBusy(true);
    try {
      const j = await api("POST", { action: "invite" });
      setLink(j.token);
    } catch (e) {
      setMsg((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  async function submit() {
    if (step < 2) {
      setStep(step + 1);
      window.scrollTo(0, 0);
      return;
    }
    if (
      (p.volume && !valid(p.volume, true)) ||
      p.rows.some((r) => r.some((v) => v !== "" && !valid(v))) ||
      [p.capitalNow, p.capitalSI, p.deliveryCost || ""].some(
        (v) => v !== "" && !valid(v),
      )
    ) {
      setMsg(
        "Geçerli ve negatif olmayan tutarlar girin. Miktar sıfırdan büyük olmalı.",
      );
      return;
    }
    if (offline) {
      setCurrent(null);
      nav("report");
      setMsg(
        "Yerel önizleme. Bu karar notunu yazdırabilir veya PDF olarak saklayabilirsiniz. Sunucuya kayıt yapılmadı.",
      );
      return;
    }
    setBusy(true);
    setMsg("");
    try {
      await api("POST", { entry: p, id });
      try {
        sessionStorage.removeItem("slovenija-form:" + invite);
      } catch {}
      setDraft(false);
      setCurrent(null);
      nav("report");
      setMsg("Dosya kaydedildi. Dosyalarım bölümünden tekrar açabilirsiniz.");
    } catch (e) {
      setMsg((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  async function update() {
    if (!current) return;
    setBusy(true);
    try {
      await api("PATCH", current);
      setCurrent({ ...current, revision: current.revision + 1 });
      setMsg("Takip bilgileri kaydedildi.");
    } catch (e) {
      setMsg((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  function openFile(f: FileRow) {
    setCurrent(f);
    nav("report");
  }
  const alert = msg ? (
    <div className="notice" role="status">
      {msg}
      {msg.includes("oturum") && (
        <>
          {" "}
          <a
            href={
              "/signin-with-chatgpt?return_to=" +
              encodeURIComponent("/" + (invite ? "?davet=" + invite : ""))
            }
            target="_top"
          >
            Oturum aç
          </a>
        </>
      )}
    </div>
  ) : null;
  return (
    <>
      <a className="skip" href="#main-content">
        İçeriğe geç
      </a>
      <Header
        view={view}
        navigate={(v) =>
          v === "desk"
            ? void desk()
            : v === "guide"
              ? openGuide(chosen)
              : v === "map"
                ? openMap(chosen)
                : v === "sector"
                  ? openSector(chosen)
                  : nav(v)
        }
        choose={openSector}
        read={openGuide}
        pilot={(id) => openMap(id, true)}
        newFile={begin}
      />
      <main
        id="main-content"
        className={
          view === "home" || view === "company" || view === "map" || view === "sector"
            ? "home-main"
            : "shell inner-main"
        }
      >
        {view === "company" && <CompanyBrief />}
        {view === "home" && (
          <Home
            intake={() => nav("intake")}
            map={openMap}
            dossier={openSector}
            begin={begin}
            pilot={(id) => openMap(id, true)}
            draftNotice={
              <>
                {invite && (
                  <div className="wide notice">
                    Görüşme davetiyle geldiniz. Kaydettiğiniz dosyayı davet
                    sahibi de görebilecek.
                  </div>
                )}
                {draft && (
                  <div className="wide resume">
                    Bu sekmede açık bir {p.mode.toLocaleLowerCase("tr")}{" "}
                    dosyanız var.{" "}
                    <button onClick={() => nav("entry")}>Taslağa dön →</button>
                  </div>
                )}
              </>
            }
          />
        )}
        {view === "intake" && ready && (
          <Intake
            key={invite}
            initialProfile={initialProfile}
            invite={invite}
            offline={offline}
            save={saveIntake}
          />
        )}
        {view === "sector" && (
          <SectorDevelopment
            intake={() => nav("intake")}
            key={chosen}
            sector={atlas.find((s) => s.id === chosen)!}
            choose={openSector}
            map={() => openMap(chosen)}
            guide={() => openGuide(chosen)}
            pilot={() => openMap(chosen, true)}
            start={() =>
              offerStart(atlas.find((s) => s.id === chosen)!.pilotMode, chosen)
            }
          />
        )}
        {view === "map" && (
          <RelationshipMap
            key={chosen + String(initialPilot)}
            initialPilot={initialPilot}
            sector={atlas.find((s) => s.id === chosen)!}
            change={openMap}
            back={() => nav("home")}
            dossier={() => openSector(chosen)}
            start={() =>
              offerStart(atlas.find((s) => s.id === chosen)!.pilotMode, chosen)
            }
          />
        )}
        {view === "new" && (
          <>
            {pendingMode && (
              <p className="notice">
                {selected.name} için seçilen dosya türü: {pendingMode}.
              </p>
            )}
            <FileChooser
              onStart={start}
              resume={draft ? () => nav("entry") : undefined}
            />
          </>
        )}
        {view === "entry" && (
          <>
            <div className="eyebrow">
              <b />
              {p.mode.toLocaleUpperCase("tr")} DOSYASI
            </div>
            <h1 className="innerTitle">{steps[step]}</h1>
            <div className="steps">
              {steps.map((n, i) => (
                <span key={n} className={i === step ? "here" : ""}>
                  {index(i)} · {n}
                </span>
              ))}
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                submit();
              }}
            >
              <section className="paper">
                {step === 0 && (
                  <>
                    <div className="grid">
                      {field("Firma adı veya dosya takma adı", "firm", {
                        required: true,
                      })}
                      {field("Firmadaki rolünüz", "role", {
                        placeholder: "Örn. ihracat müdürü",
                      })}
                      {field(
                        "Geri dönüş için iş e-postası (isteğe bağlı)",
                        "contact",
                        { type: "email" },
                      )}
                      <label className="field">
                        <span>Sektör</span>
                        <select
                          value={p.sector}
                          onChange={(e) => {
                            const s = sectors.find(
                              (x) => x.id === e.target.value,
                            )!;
                            setP({
                              ...p,
                              sector: s.id,
                              answers: Array(6).fill(""),
                              unit: p.mode === "Proje" ? "Proje" : s.unit,
                            });
                          }}
                        >
                          {sectors.map((s) => (
                            <option key={s.id} value={s.id}>
                              {s.name}
                            </option>
                          ))}
                        </select>
                      </label>
                      {field("Hedef ülke veya bölge", "market", {
                        required: true,
                        placeholder: "Örn. Kuzey İtalya",
                      })}
                      {field(
                        p.mode === "Ürün"
                          ? "Hangi ürün veya siparişi inceleyelim?"
                          : "Hangi projeyi ve iş kapsamını inceleyelim?",
                        "offer",
                        { required: true },
                      )}
                      {field(
                        "Karşılaştırılacak bölgesel model",
                        "regionalModel",
                        {
                          required: true,
                          placeholder: "Örn. Graz’da servis ortaklığı",
                        },
                      )}
                      {field("Hedef alıcı tipi", "buyer", {
                        required: true,
                        placeholder: "Örn. bölgesel distribütör",
                      })}
                      {field("Alıcıdan gelen sinyal", "signal", {
                        options: signals,
                      })}
                      {field(
                        p.mode === "Ürün"
                          ? "Siparişi zorlaştıran ana koşul"
                          : "Projenin önündeki ana engel",
                        "barrier",
                      )}
                    </div>
                    <BriefFields p={p} change={change} />
                  </>
                )}
                {step === 1 && (
                  <>
                    <h2>{sector.name}</h2>
                    <p className="muted">
                      Bildiğiniz soruları yanıtlayın. Boş kalanlar karar notuna
                      görüşme gündemi olarak eklenir.
                    </p>
                    <div className="grid">
                      {sector.questions.map((q, i) => (
                        <label className="field" key={q}>
                          <span>
                            <i>{index(i)}</i> {q}
                          </span>
                          <textarea
                            maxLength={2000}
                            value={p.answers[i]}
                            onChange={(e) =>
                              setP({
                                ...p,
                                answers: p.answers.map((a, j) =>
                                  i === j ? e.target.value : a,
                                ),
                              })
                            }
                            rows={2}
                          />
                        </label>
                      ))}
                    </div>
                  </>
                )}
                {step === 2 && (
                  <>
                    <h2>Aynı hacim, aynı kapsam</h2>
                    <p className="muted">
                      Tutarları avro girin. Bilinmeyen alanı boş bırakın.
                      Gerçekten gider yoksa 0 yazın.
                    </p>
                    <div className="grid">
                      {field("Teslim noktası ve kapsam", "scope", {
                        placeholder: "Örn. Graz deposuna teslim",
                      })}
                      {field("Karşılaştırma dönemi", "period", {
                        options: [
                          "Bir sipariş",
                          "Bir proje",
                          "Bir ay",
                          "Bir sezon",
                          "Bir yıl",
                        ],
                      })}
                      {field("Miktar", "volume", { placeholder: "Örn. 1000" })}
                      {field("Ölçü birimi", "unit", { required: true })}
                    </div>
                    <div className="economy">
                      {rowNames.map((name, i) => (
                        <div key={name}>
                          <h3>{name}</h3>
                          {costs.map((label, j) => (
                            <Field
                              key={label}
                              label={label + " (€)"}
                              value={p.rows[i][j]}
                              onChange={(v) =>
                                setP({
                                  ...p,
                                  rows: p.rows.map((r, k) =>
                                    k === i
                                      ? r.map((a, m) => (m === j ? v : a))
                                      : r,
                                  ),
                                })
                              }
                            />
                          ))}
                          <Field
                            label="Ortak veri dayanağı"
                            options={sources}
                            value={p.sources[i]}
                            onChange={(v) =>
                              setP({
                                ...p,
                                sources: p.sources.map((x, k) =>
                                  k === i ? v : x,
                                ),
                              })
                            }
                          />
                          <details className="evidence-fields">
                            <summary>Kalem bazında dayanak</summary>
                            {costs.map((label, j) => (
                              <label className="field" key={label}>
                                <span>{label}</span>
                                <select
                                  value={p.lineSources?.[i]?.[j] || ""}
                                  onChange={(e) => {
                                    const lineSources = (
                                      p.lineSources || blank().lineSources
                                    ).map((row) => [...row]);
                                    lineSources[i][j] = e.target.value;
                                    setP({ ...p, lineSources });
                                  }}
                                >
                                  <option value="">
                                    Ortak dayanağı kullan
                                  </option>
                                  {sources.map((v) => (
                                    <option key={v}>{v}</option>
                                  ))}
                                </select>
                              </label>
                            ))}
                          </details>
                        </div>
                      ))}
                    </div>
                    <div className="grid">
                      {field(
                        "İnisiyatifin birim hizmet maliyeti (€)",
                        "deliveryCost",
                      )}
                      {field(
                        "Mevcut yöntemde bağlanan sermaye (€)",
                        "capitalNow",
                      )}
                      {field(
                        rowNames[1] + " · bağlanan sermaye (€)",
                        "capitalSI",
                      )}
                    </div>
                    <PilotFields p={p} change={change} />
                    <p className="muted">
                      {invite
                        ? "Kayıt, sizi davet eden kişinin çalışma masasına da eklenecek."
                        : "Kayıt kendi çalışma masanıza eklenecek."}
                    </p>
                  </>
                )}
              </section>
              {alert}
              <div className="actions">
                <button
                  type="button"
                  className="outline"
                  disabled={busy}
                  onClick={() => (step ? setStep(step - 1) : nav("home"))}
                >
                  ← Geri
                </button>
                <button className="primary" disabled={busy}>
                  {busy
                    ? "Kaydediliyor…"
                    : step === 2
                      ? offline
                        ? "Karar notunu aç →"
                        : "Kaydet ve karar notunu aç →"
                      : "Devam et →"}
                </button>
              </div>
            </form>
          </>
        )}
        {view === "guide" && (
          <>
            <div className="eyebrow">
              <b /> FİRMA GÖRÜŞMESİ
            </div>
            <h1 className="innerTitle">Müşteriyi tanıma</h1>
            <div className="resume">
              <span>Firmanızın ihtiyacını kendi sözcüklerinizle paylaşın.</span>
              <button onClick={() => nav("intake")}>
                Firma başvurusunu doldur →
              </button>
            </div>
            <div className="guideNav">
              <button
                className={!rule ? "selected" : ""}
                onClick={() => setRule(false)}
              >
                Soru bankası
              </button>
              <button
                className={rule ? "selected" : ""}
                onClick={() => setRule(true)}
              >
                Ana talimat
              </button>
              <a
                href={
                  offline
                    ? "data:text/markdown;charset=utf-8," +
                      encodeURIComponent(
                        [
                          guide, discoveryGuide(),
                          "## Ortak sorular",
                          ...common,
                          ...sectors.flatMap((s) => [
                            "## " + s.name,
                            ...s.questions,
                            s.next,
                            s.pilot,
                          ]),
                        ].join("\n\n"),
                      )
                    : "/slovenija-calisma-rehberi.md"
                }
                download="Slovenija-Calisma-Rehberi.md"
              >
                Rehberi indir ↓
              </a>
            </div>
            {rule ? (
              <article className="paper">
                <h2>Proje ana talimatı</h2>
                {guide
                  .split("\n")
                  .slice(2)
                  .filter(Boolean)
                  .map((s, i) => (
                    <p key={i}>{s}</p>
                  ))}
              </article>
            ) : (
              <>
                <Discovery key={chosen} sector={chosen} selectSector={openGuide} apply={(sector,activity,projectRole)=>{
                  setInitialProfile({sector,activity,projectRole}); nav("intake");
                }}/>
                <section className="paper"><h3>Firma için çalışma dosyası</h3>
                  <p>Yanıtlardan hareketle bir pilot seçin. Çalışma masasında sorumlusunu, hedef tarihini ve sonraki adımı takip edin.</p>
                  <button
                    className="primary"
                    onClick={() =>
                      offerStart(
                        atlas.find((s) => s.id === chosen)!.pilotMode,
                        chosen,
                      )
                    }
                  >
                    Bu sektörde dosya başlat →
                  </button>
                </section>
              </>
            )}
          </>
        )}
        {view === "desk" && (
          <>
            <div className="eyebrow">
              <b /> ÇALIŞMA ALANI
            </div>
            <h1 className="innerTitle">Dosyalarım</h1>
            <div className="paper">
              <h2>Firma daveti</h2>
              <p>
                Bağlantınızla oturum açıp başvurusunu kaydeden firmanın dosyası
                bu masaya gelir. Erişim, sitenin paylaşım ayarlarına bağlıdır.
              </p>
              {ownLink ? (
                <label className="field">
                  <span>Firma görüşme bağlantınız</span>
                  <input
                    readOnly
                    value={location.origin + "/?davet=" + ownLink + "#basvuru"}
                    onFocus={(e) => e.target.select()}
                  />
                </label>
              ) : (
                <button
                  className="outline"
                  disabled={busy || offline}
                  onClick={createLink}
                >
                  Davet bağlantımı oluştur
                </button>
              )}
            </div>
            {alert}
            {!offline && (
              <section className="paper">
                <h2>Firmaya gönderilecek form</h2>
                <p>
                  Henüz site erişimi olmayan müşterinize bu HTML dosyasını
                  iletin. Firma formu tarayıcısında doldurur ve indirdiği yanıt
                  dosyasını size geri gönderir.
                </p>
                <a
                  className="plain-link"
                  href="/firma-basvurusu.html"
                  download="Firma-Basvurusu.html"
                >
                  Boş başvuru formunu indir ↓
                </a>
              </section>
            )}
            {!offline && (
              <details className="paper">
                <summary>Çevrimdışı firma başvurusunu içe aktar</summary>
                <p>
                  Firmanın doldurup size ilettiği JSON dosyasını seçin. Başvuru
                  bu masaya kaydedilir.
                </p>
                <label className="field">
                  <span>Başvuru dosyası (.json)</span>
                  <input
                    type="file"
                    accept=".json,application/json"
                    disabled={busy}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      e.target.value = "";
                      if (file) void importIntake(file);
                    }}
                  />
                </label>
              </details>
            )}
            <section className="paper">
              <div className="sectionHead">
                <h2>Kayıtlı dosyalar</h2>
                <button className="text" onClick={() => desk()}>
                  Yenile ↻
                </button>
              </div>
              <Field
                label="Firma, sektör veya durum ara"
                value={filter}
                onChange={setFilter}
              />
              {busy ? (
                <p>Yükleniyor…</p>
              ) : files.length === 0 ? (
                <p>
                  {msg
                    ? "Kayıtlar görüntülenemedi."
                    : "Henüz kayıtlı dosya yok."}
                </p>
              ) : files.filter((f) =>
                  (
                    f.payload.firm +
                    " " +
                    f.stage +
                    " " +
                    (sectors.find((s) => s.id === f.payload.sector)?.name || "")
                  )
                    .toLocaleLowerCase("tr")
                    .includes(filter.toLocaleLowerCase("tr")),
                ).length === 0 ? (
                <p>Eşleşen dosya bulunamadı.</p>
              ) : (
                files
                  .filter((f) =>
                    (
                      f.payload.firm +
                      " " +
                      f.stage +
                      " " +
                      (sectors.find((s) => s.id === f.payload.sector)?.name ||
                        "")
                    )
                      .toLocaleLowerCase("tr")
                      .includes(filter.toLocaleLowerCase("tr")),
                  )
                  .map((f) => (
                    <button
                      key={f.id}
                      className="fileRow"
                      onClick={() => openFile(f)}
                    >
                      <span>
                        <strong>{f.payload.firm}</strong>
                        <small>
                          {f.payload.kind === "intake" && "Firma başvurusu · "}
                          {f.payload.offer} · {f.payload.market}
                        </small>
                      </span>
                      <span>{f.stage} ↗</span>
                    </button>
                  ))
              )}
            </section>
          </>
        )}
        {view === "report" && (
          <>
            {alert}
            <Report p={current?.payload || p} />
            {current && (
              <section className="paper">
                <h2>Dosya takibi</h2>
                {current.canReview ? (
                  <div className="grid">
                    {(["stage", "assignee", "due", "task"] as const).map(
                      (k, i) => (
                        <Field
                          key={k}
                          label={
                            [
                              "Durum",
                              "Sorumlu kişi",
                              "Hedef tarih",
                              "Sonraki adım",
                            ][i]
                          }
                          options={k === "stage" ? stages : undefined}
                          type={k === "due" ? "date" : "text"}
                          value={current[k]}
                          onChange={(v) => setCurrent({ ...current, [k]: v })}
                        />
                      ),
                    )}
                    <button
                      className="primary"
                      disabled={busy}
                      onClick={update}
                    >
                      Takibi kaydet
                    </button>
                  </div>
                ) : (
                  <p>
                    {[
                      current.stage,
                      current.task,
                      current.assignee,
                      current.due,
                    ]
                      .filter(Boolean)
                      .join(" · ")}
                  </p>
                )}
              </section>
            )}
            <div className="actions">
              <button className="outline" onClick={() => desk()}>
                Dosyalarıma dön
              </button>
              <button className="primary" onClick={() => window.print()}>
                Yazdır / PDF
              </button>
            </div>
          </>
        )}
      </main>
      <footer>
        <div className="shell">
          <div className="foot-brand">
            <Logo />
            <strong>investors.com.tr</strong>
          </div>
          <span>Orta Avrupa ve Slovenya Yatırım İnisiyatifi</span>
        </div>
      </footer>
    </>
  );
}
