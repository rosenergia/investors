import { sectors } from "./content";

export const topics = [
  {
    id: "tekstil",
    short: "Tekstil",
    color: "#2163d7",
    pale: "#e9f1ff",
    topics: ["Tekrar siparişi", "Termin ve adet", "Beden dağılımı"],
    questionIndices: [2, 1, 5],
    pilotMode: "Ürün",
  },
  {
    id: "hvac",
    short: "İklimlendirme",
    color: "#0b8276",
    pale: "#e3f5ed",
    topics: ["Saha performansı", "Yerel servis", "Kabul ölçütü"],
    questionIndices: [2, 3, 5],
    pilotMode: "Proje",
  },
  {
    id: "celik",
    short: "Yapısal çelik",
    color: "#ba6428",
    pale: "#fff0db",
    topics: ["Metraj", "Montaj maliyeti", "Teslim belgeleri"],
    questionIndices: [2, 4, 3],
    pilotMode: "Proje",
  },
  {
    id: "makine",
    short: "Makine",
    color: "#7955b3",
    pale: "#f1ebfb",
    topics: ["Entegrasyon", "Kabul testi", "Devreye alma"],
    questionIndices: [3, 2, 4],
    pilotMode: "Proje",
  },
  {
    id: "gida",
    short: "Gıda",
    color: "#a33e72",
    pale: "#fae9f2",
    topics: ["Raf ömrü", "Fire ve ret", "Palet hacmi"],
    questionIndices: [3, 2, 1],
    pilotMode: "Ürün",
  },
  {
    id: "enerji",
    short: "Enerji",
    color: "#33762d",
    pale: "#eaf5de",
    topics: ["Tüketim profili", "Bağlantı takvimi", "Saha kabulü"],
    questionIndices: [2, 3, 5],
    pilotMode: "Proje",
  },
] as const;
export const atlas = topics.map((topic) => ({
  ...topic,
  ...sectors.find((sector) => sector.id === topic.id)!,
}));
