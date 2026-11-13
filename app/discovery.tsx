"use client";
import { useState } from "react";
import { interviewQuestions, interviewSteps, profiles, projectRoles } from "../lib/discovery";

type Props = {
  sector: string;
  selectSector: (id: string) => void;
  apply: (sector: string, activity: string, role: string) => void;
};
export function Discovery({ sector, selectSector, apply }: Props) {
  const profile = profiles[sector];
  const [name, setName] = useState(profile.activities[0][0]);
  const [role, setRole] = useState("");
  const activity = profile.activities.find(([n]) => n === name) || profile.activities[0];
  return <>
    <section className="paper"><h2>İlk görüşmeden takibe</h2>
      <ol>{interviewSteps.map(([title, text]) => <li key={title}><strong>{title}.</strong> {text}</li>)}</ol>
    </section>
    <section className="paper"><h2>Görüşmeyi hazırlayın</h2>
      <div className="grid">
        <label className="field"><span>Ana sektör</span><select value={sector} onChange={e => selectSector(e.target.value)}>
          {Object.entries(profiles).map(([id, p]) => <option key={id} value={id}>{p.name}</option>)}
        </select></label>
        <label className="field"><span>Faaliyet alanı</span><select value={activity[0]} onChange={e => setName(e.target.value)}>
          {profile.activities.map(([n]) => <option key={n}>{n}</option>)}
        </select></label>
        <label className="field"><span>Bu işte firmanın rolü</span><select value={role} onChange={e => setRole(e.target.value)}>
          <option value="">Rolü görüşmede netleştir</option>
          {Object.keys(projectRoles).map(r => <option key={r}>{r}</option>)}
        </select></label>
      </div>
      {sector === "celik" && <p>Örneğin Rönesans gibi bir ana yükleniciye teklif sunan çelik imalatçısında, firmanın rolü imalat veya montajdır. Alıcı tarafta teknik onayı ve hakedişi kimin imzaladığını ayrıca sorun.</p>}
      <h3>{activity[0]} için görüşme soruları</h3>
      <ol>{interviewQuestions(activity, role).map(q => <li key={q}>{q}</li>)}</ol>
      <div className="decision"><strong>Görüşmede istenecek kanıt</strong><p>{activity[2]}</p></div>
      <button className="primary" onClick={() => apply(sector, activity[0], role)}>Bu seçimle firma başvurusunu aç →</button>
    </section>
  </>;
}
