"use client";
import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronDown,
  Download,
  Printer,
} from "lucide-react";
import { blank, isEntry, type Entry } from "../lib/assessment";
import { sectors } from "../lib/content";
import { photograph } from "../lib/editorial";

import { activityOf, profiles, projectRoles, interviewQuestions } from "../lib/discovery";

const issueGroups: Record<string, { options: string[]; example: string }> = {
  celik: {
    options: [
      "Keşif, renovasyon ve kapsam değişikliği",
      "EPC paket sınırları ve sorumluluk",
      "Ana yükleniciye erişim ve ön yeterlik",
      "Çizim ve metraj revizyonu",
      "Çelik fiyatı ve teklif süresi",
      "Nakliye, vinç ve montaj",
      "Kalite belgeleri ve saha kabulü",
      "Hakediş ve tahsilat",
    ],
    example:
      "Son işte tonaj hangi aşamada değişti? Sevkiyat veya montaj için neyi yeniden planladınız?",
  },
  tekstil: {
    options: [
      "Asgari adet ve tekrar siparişi",
      "Beden ve renk stoğu",
      "Teslim süresi ve dağıtım",
      "İade ve kalite",
      "Alıcıya erişim ve vade",
    ],
    example:
      "Son siparişte hangi beden, renk veya teslim şartı alıcının kararını etkiledi?",
  },
  hvac: {
    options: [
      "İklim riskine bağlı duruş",
      "Tasarruf ve emisyon ölçümü",
      "Şartnameye giriş",
      "Saha performansı ve kabul",
      "Devreye alma",
      "Servis ağı ve yedek parça",
      "Garanti maliyeti",
    ],
    example:
      "Son kurulumda alıcının beklediği servis süresiyle sunabildiğiniz süre arasındaki fark neydi?",
  },
  gida: {
    options: [
      "Soğuk zincirde sıcaklık",
      "Teslimde raf ömrü",
      "Sezonda taşıma kapasitesi",
      "Ambalaj ve ürün kabulü",
      "Fire ve ret maliyeti",
    ],
    example:
      "Son sevkiyatta fire, ret veya iskonto teslimin hangi aşamasında doğdu?",
  },
  makine: {
    options: [
      "Parti kalitesi ve tolerans",
      "Hammadde, fire ve enerji maliyeti",
      "Hat entegrasyonu",
      "Kapasite ve kabul testi",
      "Devreye alma süresi",
      "Yerel servis ve yedek parça",
      "Ödeme ve garanti",
    ],
    example:
      "Son projede hat duruşunu hangi işlem uzattı? Kabul koşulu nasıl değişti?",
  },
  enerji: {
    options: [
      "Proje sahibine ve ihaleye erişim",
      "Şebeke bağlantısı",
      "Üretim ve tüketim tahmini",
      "Kurulum, servis ve garanti",
      "Finansman ve ödeme planı",
    ],
    example:
      "Son projede bağlantı görüşü, tüketim verisi, kurulum takvimi veya finansman kararı sizi nerede bekletti?",
  },
};
const countries = [
  "Avusturya",
  "Hırvatistan",
  "İtalya",
  "Macaristan",
  "Slovenya",
  "Almanya",
  "Çekya",
  "Slovakya",
  "Polonya",
  "Fransa",
  "Hollanda",
  "Henüz belirlenmedi",
];
const stages = ["Sektör", "İhtiyaç", "Firma ve pazar"];
const fields = [
  "sector",
  "offer",
  "barrier",
  "reason",
  "success",
  "firm",
  "role",
  "contact",
  "market",
] as const;
type InputKey = (typeof fields)[number];
type Props = {
  initialProfile?: {sector:string; activity:string; projectRole:string};
  invite: string;
  offline: boolean;
  save: (id: string, p: Entry) => Promise<void>;
};
type Draft = { id: string; entry: Entry; step: number };

function fresh(invite: string): Draft {
  return {
    id: "",
    entry: { ...blank(), kind: "intake", sector: "", invite },
    step: 0,
  };
}

function loadDraft(invite: string, key: string): Draft {
  const draft = fresh(invite);
  draft.id = crypto.randomUUID();
  try {
    const stored = JSON.parse(sessionStorage.getItem(key) || "null");
    if (
      !stored ||
      !/^[a-f\d]{8}(?:-[a-f\d]{4}){3}-[a-f\d]{12}$/i.test(stored.id)
    )
      return draft;
    const e = stored.entry;
    if (
      !e ||
      e.kind !== "intake" ||
      !fields.every((k) => typeof e[k] === "string" && e[k].length <= 2000)
    )
      return draft;
    if (
      !Array.isArray(e.answers) ||
      e.answers.length !== 6 ||
      !e.answers.every(
        (v: unknown) => typeof v === "string" && v.length <= 2000,
      )
    )
      return draft;
    for (const k of fields) draft.entry[k] = e[k];
    for (const k of ["activity", "projectRole", "proof", "owner", "deadline", "approach"] as const) {
      if (typeof e[k] === "string" && e[k].length <= 2000) draft.entry[k] = e[k];
    }
    draft.entry.answers = e.answers;
    draft.id = stored.id;
    const sector = sectors.find((s) => s.id === e.sector);
    if (!sector) {
      draft.entry.sector = "";
      return draft;
    }
    draft.entry.unit = sector.unit;
    draft.entry.mode = ["celik", "hvac", "makine", "enerji"].includes(sector.id)
      ? "Proje"
      : "Ürün";
    const validIssue = [e.offer, e.barrier, e.reason, e.success].every((v) =>
      v.trim(),
    );
    draft.step =
      stored.step === 2 && validIssue
        ? 2
        : stored.step === 1 || stored.step === 2
          ? 1
          : 0;
  } catch {
    /* Storage can be unavailable in a standalone file. */
  }
  return draft;
}
function download(d: Draft) {
  const url = URL.createObjectURL(
    new Blob(
      [
        JSON.stringify(
          { id: d.id, entry: { ...d.entry, invite: "" } },
          null,
          2,
        ),
      ],
      { type: "application/json" },
    ),
  );
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "firma-basvurusu-" + d.id.slice(0, 8) + ".json";
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}
export function IntakeSummary({ p }: { p: Entry }) {
  const sector = sectors.find((s) => s.id === p.sector);
  const activity = activityOf(p.sector, p.activity);
  const questions = activity ? interviewQuestions(activity, p.projectRole) : sector?.questions;
  const rows = [
    ["Sektör", activity ? profiles[p.sector].name : sector?.name],
    ["Faaliyet alanı", p.activity], ["Firmanın proje rolü", p.projectRole],
    ["Hedef pazar", p.market],
    ["Öncelikli konu", p.offer],
    ["Yaşanan sorun", p.barrier],
    ["İşletmeye etkisi", p.reason],
    ["Beklenen sonuç", p.success],
    ...(questions?.map((q, i) => [q, p.answers[i]]) || []),
    ["İzlenecek iş", p.approach], ["Beklenen kanıt", p.proof],
    ["Takip sorumlusu", p.owner], ["Takip tarihi", p.deadline],
    ["Firma", p.firm],
    ["Görüşülecek kişi / görev", p.role],
    ["İletişim", p.contact],
  ].filter(([, value]) => value?.trim());
  return (
    <section className="intake-summary" aria-label="Başvuru özeti">
      <p className="intake-label">FİRMA BAŞVURUSU</p>
      <h2>{p.firm}</h2>
      <dl>
        {rows.map(([label, value]) => (
          <div key={label}>
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

export function Intake(props: Props) {
  return <IntakeForm key={props.invite} {...props} />;
}
function IntakeForm({ invite, offline, save, initialProfile }: Props) {
  const key = "avrupa-firma-basvurusu:" + invite;
  const [draft, setDraft] = useState<Draft>(() => fresh(invite));
  const [ready, setReady] = useState(false);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const stepHeading = useRef<HTMLHeadingElement>(null);
  const sending = useRef(false);
  const focusNext = useRef(false);
  const { entry: p, step } = draft;
  const sector = sectors.find((s) => s.id === p.sector);
  const group = issueGroups[p.sector];
  const activity = activityOf(p.sector, p.activity);
  const questions = activity ? interviewQuestions(activity, p.projectRole) : sector?.questions || [];
  useEffect(() => {
    const loaded = loadDraft(invite, key);
    if (!loaded.entry.sector && initialProfile) {
      const selected = sectors.find(s => s.id === initialProfile.sector);
      if (selected) Object.assign(loaded.entry, initialProfile, {unit:selected.unit,
        mode:["celik","hvac","makine","enerji"].includes(selected.id) ? "Proje" : "Ürün"});
    }
    setDraft(loaded);
    setReady(true);
  }, [invite, key, initialProfile]);
  useEffect(() => {
    if (!ready || done) return;
    try {
      sessionStorage.setItem(key, JSON.stringify(draft));
    } catch {}
  }, [key, draft, ready, done]);
  useEffect(() => {
    if (!focusNext.current) return;
    stepHeading.current?.focus();
    focusNext.current = false;
  }, [step, done]);
  function selectSector(id: string) {
    const s = sectors.find((x) => x.id === id);
    if (!s || id === p.sector) return;
    setError("");
    setDraft((d) => ({
      ...d,
      entry: {
        ...d.entry,
        sector: id,
        activity: "", projectRole: "", proof:"", owner:"", deadline:"", approach:"",
        unit: s.unit,
        mode: ["celik", "hvac", "makine", "enerji"].includes(id)
          ? "Proje"
          : "Ürün",
        offer: "",
        barrier: "",
        reason: "",
        success: "",
        answers: Array<string>(6).fill(""),
      },
    }));
  }
  function chooseProfile(field: "activity" | "projectRole", value: string) {
    setDraft(d => {
      const answers = [...d.entry.answers];
      if (!d.entry.activity) answers.fill("");
      else answers[field === "activity" ? 0 : 1] = "";
      return {...d, entry:{...d.entry, [field]:value, answers}};
    });
  }
  function change(k: InputKey | "proof" | "owner" | "deadline" | "approach", v: string) {
    setError("");
    setDraft((d) => ({ ...d, entry: { ...d.entry, [k]: v } }));
  }
  function answer(i: number, v: string) {
    setDraft((d) => ({
      ...d,
      entry: {
        ...d.entry,
        answers: d.entry.answers.map((old, n) => (i === n ? v : old)),
      },
    }));
  }
  function go(next: number) {
    focusNext.current = true;
    setError("");
    setDraft((d) => ({ ...d, step: next }));
  }
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!ready || sending.current) return;
    const missing = (
      step === 0
        ? ["sector"]
        : step === 1
          ? ["offer", "barrier", "reason", "success"]
          : ["firm", "contact", "market"]
    ).find((k) => !(p[k as InputKey] || "").trim());
    if (missing) {
      setError("İşaretli alanı doldurarak devam edebilirsiniz.");
      e.currentTarget
        .querySelector<HTMLElement>('[name="' + missing + '"]')
        ?.focus();
      return;
    }
    if (step < 2) {
      go(step + 1);
      return;
    }
    if (!isEntry(p)) {
      setError("Başvurudaki zorunlu alanları kontrol edin.");
      return;
    }
    sending.current = true;
    setBusy(true);
    setError("");
    try {
      if (!offline) await save(draft.id, p);
      if (!offline)
        try {
          sessionStorage.removeItem(key);
        } catch {}
      focusNext.current = true;
      setDone(true);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Başvuru kaydedilemedi. Lütfen yeniden deneyin.",
      );
    } finally {
      sending.current = false;
      setBusy(false);
    }
  }
  const question = (q: string, i: number) => (
    <label key={q} className="intake-field">
      <span>{q}</span>
      <textarea
        rows={2}
        maxLength={2000}
        value={p.answers[i]}
        onChange={(e) => answer(i, e.target.value)}
      />
    </label>
  );
  const textArea = (k: InputKey, label: string, hint: string) => (
    <label className="intake-field">
      <span>{label} *</span>
      <small>{hint}</small>
      <textarea
        name={k}
        rows={3}
        required
        maxLength={2000}
        value={p[k]}
        onChange={(e) => change(k, e.target.value)}
      />
    </label>
  );
  if (done)
    return (
      <div className="intake-wrap intake-finished">
        <span className="intake-confirm-mark" aria-hidden="true">
          <Check />
        </span>
        <h1 tabIndex={-1} ref={stepHeading}>
          {offline ? "Başvurunuz paylaşmaya hazır" : "Başvurunuz kaydedildi"}
        </h1>
        <p>
          {offline
            ? "Yanıtlarınızı dosya olarak indirip görüşeceğiniz kişiye iletin. Bu çevrimdışı kopyadan sunucuya gönderim yapılmaz."
            : invite
              ? "Davet sahibinin çalışma masasına iletildi. Yanıtlarınızın bir kopyasını saklayabilirsiniz."
              : "Yanıtlarınızı Dosyalarım bölümünde tekrar açabilir veya dosya olarak paylaşabilirsiniz."}
        </p>
        <div className="intake-actions">
          <button
            type="button"
            className="intake-primary"
            onClick={() => download(draft)}
          >
            <Download size={17} /> Başvuru dosyasını indir
          </button>
          <button
            type="button"
            className="intake-back"
            onClick={() => window.print()}
          >
            <Printer size={17} /> Yazdır / PDF
          </button>
        </div>
        <IntakeSummary p={p} />
        <button
          type="button"
          className="intake-back"
          onClick={() => {
            const d = fresh(invite);
            d.id = crypto.randomUUID();
            focusNext.current = true;
            setDraft(d);
            setDone(false);
          }}
        >
          Yeni başvuru başlat <ArrowRight size={16} />
        </button>
      </div>
    );
  return (
    <section className="intake-wrap">
      <div className="intake-mast">
        <p className="intake-label">MÜŞTERİYİ TANIMA</p>
        <h1>Firma başvurusu</h1>
        <p>
          Sektörünüzü seçin, Avrupa’da büyürken karşılaştığınız sorunu son
          işinizden bir örnekle anlatın.
        </p>
      </div>
      <ol className="intake-progress" aria-label="Başvuru adımları">
        {stages.map((title, i) => (
          <li
            key={title}
            aria-current={step === i ? "step" : undefined}
            className={i <= step ? "reached" : ""}
          >
            <span>{i < step ? <Check size={14} /> : i + 1}</span>
            {title}
          </li>
        ))}
      </ol>
      <form onSubmit={submit} className="intake-body">
        <div className="intake-step-heading">
          <p className="intake-label">
            {sector && step > 0
              ? profiles[sector.id].name.toLocaleUpperCase("tr")
              : "SEKTÖR SEÇİMİ"}
          </p>
          <h2 tabIndex={-1} ref={stepHeading}>
            {
              [
                "Firmanız hangi sektörde?",
                "İşinizi en çok ne zorluyor?",
                "Hangi pazara ulaşmak istiyorsunuz?",
              ][step]
            }
          </h2>
        </div>
        {step === 0 && (
          <>
          <fieldset className="intake-sectors">
            <legend className="intake-sr">Sektör seçin</legend>
            {sectors.map((s) => (
              <label className="intake-sector" key={s.id}>
                <input
                  name="sector"
                  type="radio"
                  required
                  checked={p.sector === s.id}
                  value={s.id}
                  onChange={() => selectSector(s.id)}
                />
                <img alt="" src={photograph(s.id)} />
                <span>
                  <strong>{profiles[s.id].name}</strong>
                  <small>{profiles[s.id].activities.map(([name]) => name).join(" · ")}</small>
                </span>
                <span className="intake-radio" aria-hidden="true">
                  {p.sector === s.id && <Check size={13} />}
                </span>
              </label>
            ))}
          </fieldset>
          {sector && <div className="intake-fields-grid">
            <label className="intake-field"><span>Faaliyet alanınız *</span>
              <select required name="activity" value={p.activity} onChange={e=>chooseProfile("activity",e.target.value)}>
                <option value="">Faaliyet seçin</option>
                {profiles[sector.id].activities.map(([name])=><option key={name}>{name}</option>)}
              </select></label>
            <label className="intake-field"><span>Son işte firmanızın rolü *</span>
              <select required name="projectRole" value={p.projectRole} onChange={e=>chooseProfile("projectRole",e.target.value)}>
                <option value="">Rol seçin</option>{Object.keys(projectRoles).map(r=><option key={r}>{r}</option>)}
              </select></label>
          </div>}</>
        )}
        {step === 1 && sector && (
          <>
            <label className="intake-field">
              <span>Öncelikli sorun *</span>
              <select
                name="offer"
                required
                value={p.offer}
                onChange={(e) => change("offer", e.target.value)}
              >
                <option value="">Bir konu seçin</option>
                {[...(group?.options || []), "Diğer"].map((x) => (
                  <option key={x}>{x}</option>
                ))}
              </select>
            </label>
            {textArea(
              "barrier",
              "Yaşadığınız sorunu anlatın",
              activity ? "İşin kapsamını ve sorunun ilk görüldüğü aşamayı belirtin." : group?.example || "Son işinizden bir örnek verin.",
            )}
            {textArea(
              "reason",
              "Bu sorunun işletmenize etkisi ne oldu?",
              "Varsa gecikme gününü, ek maliyeti veya kaçırılan siparişi belirtin.",
            )}
            {textArea(
              "success",
              "Görüşmeden hangi sonucu bekliyorsunuz?",
              "Örneğin bir montaj ortağı bulmak, teslim süresini kısaltmak veya bir alıcıyla pilot sipariş planlamak.",
            )}
            <div className="intake-questions">
              <h3>Sektörünüze özel sorular</h3>
              <p>
                Bilgi verebildiğiniz soruları yanıtlayın. Bu bölüm isteğe
                bağlıdır.
              </p>
              {questions.slice(0, 2).map(question)}
              <details>
                <summary>
                  Diğer sektör soruları <ChevronDown size={15} />
                </summary>
                {questions.slice(2).map((q, i) => question(q, i + 2))}
              </details>
            </div>
          </>
        )}
        {step === 2 && (
          <>
            <div className="intake-fields-grid">
              <label className="intake-field">
                <span>Firma adı *</span>
                <input
                  name="firm"
                  autoComplete="organization"
                  required
                  maxLength={2000}
                  value={p.firm}
                  onChange={(e) => change("firm", e.target.value)}
                />
              </label>
              <label className="intake-field">
                <span>Görüşülecek kişi / görev</span>
                <input
                  name="role"
                  maxLength={2000}
                  value={p.role}
                  onChange={(e) => change("role", e.target.value)}
                />
              </label>
              <label className="intake-field">
                <span>E-posta veya telefon *</span>
                <input
                  name="contact"
                  required
                  maxLength={2000}
                  value={p.contact}
                  onChange={(e) => change("contact", e.target.value)}
                />
              </label>
              <label className="intake-field">
                <span>Hedef Avrupa pazarı *</span>
                <input
                  name="market"
                  required
                  list="intake-markets"
                  maxLength={2000}
                  placeholder="Ülke veya bölge yazın"
                  value={p.market}
                  onChange={(e) => change("market", e.target.value)}
                />
                <datalist id="intake-markets">
                  {countries.map((c) => (
                    <option key={c} value={c} />
                  ))}
                </datalist>
              </label>
            </div>
            <h3>Görüşme sonrası takip</h3>
            <p>Bir sonraki adımı henüz kararlaştırmadıysanız bu alanları görüşmede tamamlayabilirsiniz.</p>
            <div className="intake-fields-grid">
              {([["approach","Sonraki iş"],["proof","Beklenen belge veya ölçüm"],["owner","Takip sorumlusu"],["deadline","Hedef tarih"]] as const).map(([k,label]) =>
                <label key={k} className="intake-field"><span>{label}</span>
                <input type={k === "deadline" ? "date" : "text"} value={p[k]} maxLength={2000} onChange={e=>change(k,e.target.value)} /></label>)}
            </div>
            <p className="intake-share-note">
              {offline
                ? "Bu sürüm çevrimdışı çalışır. Son adımda yanıtlarınızı indirip paylaşabilirsiniz."
                : invite
                  ? "Başvuruyu gönderdiğinizde yanıtlarınızı ve iletişim bilginizi sizi davet eden kişi görebilir."
                  : "Başvurunuz kendi çalışma masanıza kaydedilir. Görüşeceğiniz kişiye başvuru dosyasını iletebilirsiniz."}
            </p>
          </>
        )}
        {error && (
          <p className="intake-error" role="alert">
            {error}
            {error.includes("oturum") && (
              <>
                {" "}
                <a
                  href={
                    "/signin-with-chatgpt?return_to=" +
                    encodeURIComponent(
                      "/" +
                        (invite ? "?davet=" + encodeURIComponent(invite) : "") +
                        "#basvuru",
                    )
                  }
                >
                  Oturum aç
                </a>
              </>
            )}
          </p>
        )}
        <div className="intake-actions">
          {step > 0 && (
            <button
              type="button"
              className="intake-back"
              disabled={busy}
              onClick={() => go(step - 1)}
            >
              <ArrowLeft size={16} /> Geri
            </button>
          )}
          <button
            type="submit"
            className="intake-primary"
            disabled={!ready || busy}
          >
            {busy
              ? "Kaydediliyor…"
              : step < 2
                ? "Devam et"
                : offline
                  ? "Başvuruyu hazırla"
                  : invite
                    ? "Başvuruyu gönder"
                    : "Başvuruyu kaydet"}
            <ArrowRight size={17} />
          </button>
        </div>
      </form>
    </section>
  );
}
