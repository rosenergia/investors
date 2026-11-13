import { atlas } from "./atlas";
export const sectorsInPrint = [
  "tekstil",
  "celik",
  "enerji",
  "gida",
  "makine",
  "hvac",
].map((id) => atlas.find((s) => s.id === id)!);
export type Sector = (typeof atlas)[number];
export function photograph(id: string) {
  const path = id === "harbor" ? "/harbor.webp" : "/editorial/" + id + ".webp";
  return (
    (typeof window !== "undefined" &&
      (window as Window & { atlasPhotos?: Record<string, string> })
        .atlasPhotos?.[id]) ||
    path
  );
}
