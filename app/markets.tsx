"use client";
import { useState } from "react";
import { ArrowUpRight, Globe2 } from "lucide-react";
import { sectorsInPrint } from "../lib/editorial";
import { marketCountries, marketPilots, type MarketCode } from "../lib/markets";

export function MarketExplorer({
  sector,
  dossier,
}: {
  sector?: string;
  dossier?: (id: string) => void;
}) {
  const [selectedSector, setSelectedSector] = useState("tekstil");
  const [code, setCode] = useState<MarketCode>("SI");
  const active = sectorsInPrint.find(
    (s) => s.id === (sector || selectedSector),
  )!;
  const [buyer, trial, measure] = marketPilots[active.id][code];
  const country = marketCountries.find((m) => m.code === code)!;

  return (
    <section
      className={"market-explorer" + (sector ? " in-story" : " page-gutter")}
      id="ulke-rehberi"
      aria-label="Avrupa pazarları"
    >
      <div className="market-head">
        <h2>Avrupa pazarları</h2>
        {!sector && (
          <label>
            Sektör
            <select
              value={selectedSector}
              onChange={(event) => setSelectedSector(event.target.value)}
            >
              {sectorsInPrint.map((s) => (
                <option value={s.id} key={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </label>
        )}
      </div>
      <p className="market-deck">
        Hedef pazarı seçin. Sektörünüz için bir alıcı profili ve ilk ticari
        denemeyi inceleyin.
      </p>
      <div
        className="market-options"
        role="group"
        aria-label="Hedef pazar seçin"
      >
        {marketCountries.map((m) => (
          <button
            type="button"
            key={m.code}
            aria-pressed={m.code === code}
            onClick={() => setCode(m.code)}
          >
            {m.name}
          </button>
        ))}
      </div>
      <div className="market-note" aria-live="polite" aria-atomic="true">
        <div className="market-location">
          <div className="location-context">
            <Globe2 size={20} aria-hidden="true" />
            <span>{active.short}</span>
          </div>
          <div>
            <small>Hedef pazar</small>
            <h3>{country.name}</h3>
          </div>
        </div>
        <div className="market-copy">
          <small>Örnek alıcı</small>
          <h4>{buyer}</h4>
          <p>{trial}</p>
          <div className="market-measure">
            <strong>Karar ölçütü</strong> {measure}
          </div>
          {dossier && (
            <button className="plain-link" onClick={() => dossier(active.id)}>
              Sektör dosyasını aç <ArrowUpRight size={16} />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
