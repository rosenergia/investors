import { type Entry } from "../lib/assessment";
export const approaches = [
  "Firma hizmeti",
  "Ortak ticari girişim",
  "Kendi tesis yatırımı",
];
export const extraFields = {
  approach: "Çalışma biçimi",
  decider: "Satın alma kararını kim veriyor?",
  alternative: "Mevcut tedarikçi veya alternatif yöntem",
  reason: "Alıcının değiştirmek istediği koşul",
  terms: "Tahsilat ve ödeme takvimi",
  roles: "Sözleşme tarafları ve üstlendikleri işler",
  secured: "Mevcut, sözleşmeli veya araştırılan kaynaklar",
  demand: "Aylık talep ve yazılı hacim taahhüdü",
  unsubsidised: "Hibesiz işletme sonucu ve dayanağı",
  proof: "İstenecek kanıt",
  owner: "Pilot sorumlusu",
  deadline: "Hedef tarih",
  success: "Pilotun başarı ölçütü",
};
type Key = keyof typeof extraFields;
export function BriefFields({
  p,
  change,
}: {
  p: Entry;
  change: (k: Key, v: string) => void;
}) {
  const keys = [
    "decider",
    "alternative",
    "reason",
    "terms",
    "roles",
    "secured",
    ...(p.approach === "Kendi tesis yatırımı"
      ? ["demand", "unsubsidised"]
      : []),
  ] as Key[];
  return (
    <details>
      <summary>İş modeli ve satın alma koşulları</summary>
      <div className="grid follow-fields">
        <label className="field">
          <span>Çalışma biçimi</span>
          <select
            value={p.approach || ""}
            onChange={(e) => change("approach", e.target.value)}
          >
            <option value="">Henüz belirlenmedi</option>
            {approaches.map((v) => (
              <option key={v}>{v}</option>
            ))}
          </select>
        </label>
        {keys.map((k) => (
          <label className="field" key={k}>
            <span>{extraFields[k]}</span>
            <input
              maxLength={2000}
              value={p[k] || ""}
              onChange={(e) => change(k, e.target.value)}
            />
          </label>
        ))}
      </div>
    </details>
  );
}
export function PilotFields({
  p,
  change,
}: {
  p: Entry;
  change: (k: Key, v: string) => void;
}) {
  return (
    <details>
      <summary>Pilot çalışma ve takip planı</summary>
      <div className="grid follow-fields">
        {(["proof", "owner", "deadline", "success"] as const).map((k) => (
          <label className="field" key={k}>
            <span>{extraFields[k]}</span>
            <input
              type={k === "deadline" ? "date" : "text"}
              maxLength={2000}
              value={p[k] || ""}
              onChange={(e) => change(k, e.target.value)}
            />
          </label>
        ))}
      </div>
    </details>
  );
}
export function BriefReport({ p }: { p: Entry }) {
  const used = (Object.keys(extraFields) as Key[]).filter(
    (k) =>
      p[k] &&
      (!["demand", "unsubsidised"].includes(k) ||
        p.approach === "Kendi tesis yatırımı"),
  );
  return used.length ? (
    <details open>
      <summary>İş modeli ve pilot planı</summary>
      <dl>
        {used.map((k) => (
          <div key={k}>
            <dt>{extraFields[k]}</dt>
            <dd>{p[k]}</dd>
          </div>
        ))}
      </dl>
    </details>
  ) : null;
}
