import { sectors } from "./content";
export const modes = ["Ürün", "Proje"] as const;
export const sources = [
  "Belirsiz",
  "Tahmin",
  "Firma beyanı",
  "Yazılı teklif",
  "Gerçekleşen işlem",
];
export const stages = [
  "Yeni dosya",
  "Görüşme planlandı",
  "Teklif bekleniyor",
  "Pilot çalışması",
  "Beklemede",
  "Tamamlandı",
];
export const costs = [
  "Fatura edilecek birim satış fiyatı",
  "Birim üretim veya tedarik maliyeti",
  "Birim lojistik, stok, fire ve servis gideri",
  "Birim yerel hizmet bedeli",
  "Döneme ait ek sabit gider",
];
export function methodNames(p: Entry) {
  return ["Mevcut yöntem", p.regionalModel || "Slovenya modeli"];
}
export function blank() {
  return {
    kind: "assessment",
    activity: "",
    projectRole: "",
    regionalModel: "Bölgesel model",
    lineSources: Array.from({ length: 2 }, () => Array<string>(5).fill("")),
    deliveryCost: "",
    approach: "",
    decider: "",
    alternative: "",
    reason: "",
    terms: "",
    roles: "",
    secured: "",
    demand: "",
    unsubsidised: "",
    proof: "",
    owner: "",
    deadline: "",
    success: "",
    mode: "Ürün",
    sector: "tekstil",
    firm: "",
    role: "",
    contact: "",
    capitalNow: "",
    capitalSI: "",
    offer: "",
    market: "",
    buyer: "",
    barrier: "",
    signal: "Henüz görüşülmedi",
    scope: "",
    unit: "Adet",
    volume: "",
    period: "Bir sipariş",
    answers: Array<string>(6).fill(""),
    rows: Array.from({ length: 2 }, () => Array<string>(5).fill("")),
    sources: ["Belirsiz", "Belirsiz"],
    invite: "",
  };
}
export type Entry = ReturnType<typeof blank>;
export function valid(n: string, positive = false) {
  return (
    n.trim() !== "" &&
    /^\d+(?:[.,]\d+)?$/.test(n.trim()) &&
    Number.isFinite(num(n)) &&
    num(n) <= 1e12 &&
    (!positive || num(n) > 0)
  );
}
export function num(n: string) {
  return Number(n.trim().replace(",", "."));
}
export function assess(p: Entry) {
  const sector = sectors.find((s) => s.id === p.sector)!;
  const totals = p.rows.map((row) =>
    valid(p.volume, true) && row.every((v) => valid(v))
      ? (num(row[0]) - row.slice(1, 4).reduce((sum, x) => sum + num(x), 0)) *
          num(p.volume) -
        num(row[4])
      : null,
  );
  const diff =
    totals[0] !== null && totals[1] !== null ? totals[1] - totals[0] : null;
  const evidence = p.rows.every((row, i) =>
    row.every((_, j) =>
      ["Yazılı teklif", "Gerçekleşen işlem"].includes(
        p.lineSources?.[i]?.[j] || p.sources[i],
      ),
    ),
  );
  const buyerKnown = [
    "Teklif talebi var",
    "Sipariş veya sözleşme var",
  ].includes(p.signal);
  let verdict = "Maliyet tekliflerini tamamlayın",
    next = "İki yöntemi aynı birim, dönem ve teslim kapsamı için fiyatlayın.";
  if (diff !== null) {
    if (diff <= 0) {
      verdict = "Mevcut yöntem öncelikli";
      next =
        "Sonucu değiştirebilecek tek maliyet veya satış koşulunu doğrulayın.";
    } else if (!buyerKnown) {
      verdict = "Alıcı talebini doğrulayın";
      next = sector.next;
    } else if (!evidence) {
      verdict = "Fiyatları yazılı teyit edin";
      next = "En belirsiz fiyat için bir yazılı teklif isteyin.";
    } else {
      verdict = "Pilot görüşmesine aday";
      next = sector.pilot + " için karşı tarafla tarih belirleyin.";
    }
  }
  if (diff !== null && !p.scope.trim()) {
    verdict = "Teslim kapsamını eşitleyin";
    next =
      "İki teklifin aynı teslim noktası ve görevleri içerdiğini teyit edin.";
  }
  const d =
    diff === null
      ? null
      : num(p.rows[1][0]) -
        num(p.rows[0][0]) -
        p.rows[1]
          .slice(1, 4)
          .reduce((s, x, i) => s + num(x) - num(p.rows[0][i + 1]), 0);
  const fixed = diff === null ? null : num(p.rows[1][4]) - num(p.rows[0][4]);
  const equality =
    d === null || fixed === null
      ? ""
      : d === 0 && fixed === 0
        ? "Bu fiyatlarla iki yöntem her hacimde eşit katkı sağlar."
        : d === 0 || fixed / d <= 0
          ? (diff! > 0 ? methodNames(p)[1] : "Mevcut yöntem") +
            " bu fiyatlarla her pozitif hacimde daha yüksek katkı sağlar."
          : "";
  const crossing =
    d !== null && fixed !== null && d !== 0 && fixed / d > 0
      ? { volume: fixed / d, above: d > 0 }
      : null;
  return {
    totals,
    diff,
    crossing,
    equality,
    verdict,
    next,
    sector,
    evidence,
    buyerKnown,
  };
}
export function isEntry(x: unknown): x is Entry {
  if (!x || typeof x !== "object") return false;
  const p = x as Entry;
  const short = (v: unknown) => typeof v === "string" && v.length <= 2000;
  const optional = [
    "activity",
    "projectRole",
    "regionalModel",
    "approach",
    "decider",
    "alternative",
    "reason",
    "terms",
    "roles",
    "secured",
    "demand",
    "unsubsidised",
    "proof",
    "owner",
    "deadline",
    "success",
  ] as const;
  const validSources =
    p.lineSources === undefined ||
    (Array.isArray(p.lineSources) &&
      p.lineSources.length === 2 &&
      p.lineSources.every(
        (row) =>
          Array.isArray(row) &&
          row.length === 5 &&
          row.every((v) => v === "" || sources.includes(v)),
      ));
  return (
    (p.kind === undefined || p.kind === "intake" || p.kind === "assessment") &&
    validSources &&
    (p.kind !== "intake" || !p.deadline || /^\d{4}-\d{2}-\d{2}$/.test(p.deadline)) &&
    (p.deliveryCost === undefined ||
      (short(p.deliveryCost) &&
        (p.deliveryCost === "" || valid(p.deliveryCost)))) &&
    optional.every((k) => p[k] === undefined || short(p[k])) &&
    modes.some((v) => v === p.mode) &&
    sectors.some((s) => s.id === p.sector) &&
    [
      "firm",
      "role",
      "contact",
      "capitalNow",
      "capitalSI",
      "offer",
      "market",
      "buyer",
      "barrier",
      "signal",
      "scope",
      "unit",
      "volume",
      "period",
      "invite",
    ].every((k) => short(p[k as keyof Entry])) &&
    (p.kind === "intake"
      ? [p.firm, p.offer, p.market, p.barrier, p.reason, p.success, p.contact]
      : [p.firm, p.offer, p.market, p.buyer, p.unit, p.period]
    ).every((v) => typeof v === "string" && v.trim().length > 0) &&
    [p.capitalNow, p.capitalSI].every((v) => v === "" || valid(v)) &&
    (!p.volume || valid(p.volume, true)) &&
    Array.isArray(p.answers) &&
    p.answers.length === 6 &&
    p.answers.every(short) &&
    Array.isArray(p.rows) &&
    p.rows.length === 2 &&
    p.rows.every(
      (r) =>
        Array.isArray(r) &&
        r.length === 5 &&
        r.every((v) => short(v) && (v === "" || valid(v))),
    ) &&
    Array.isArray(p.sources) &&
    p.sources.length === 2 &&
    p.sources.every((v) => sources.includes(v))
  );
}
