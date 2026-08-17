"use client";

import Icon from "@/components/ui/Icon";
import { useApp } from "@/components/app-provider";

const LEVELS = [
  { icon: "sprout", num: "Lv.1", name: "Rookie", min: 0, max: 199 },
  { icon: "zap", num: "Lv.2", name: "Rising Star", min: 200, max: 399 },
  { icon: "star", num: "Lv.3", name: "Performer", min: 400, max: 699 },
  { icon: "shield", num: "Lv.4", name: "Superstar", min: 700, max: 999 },
  { icon: "crown", num: "Lv.5", name: "Legend", min: 1000, max: Infinity },
];

export default function TeamLevelProgress() {
  const { snapshot } = useApp();
  const leader = snapshot?.baData[0];
  if (!leader) return null;

  const currentRange = LEVELS[leader.level - 1] ?? LEVELS[0];
  const progress = Number.isFinite(currentRange.max)
    ? Math.min(100, ((leader.xp - currentRange.min) / (currentRange.max - currentRange.min + 1)) * 100)
    : 100;

  return (
    <div className="card panel">
      <h2>Top BA level</h2>
      <div className="levelpanel">
        <div className="shield">
          <Icon name="shield" size={44} strokeWidth={1.75} />
        </div>
        <div className="levelcopy">
          <div className="level-label">{leader.name}</div>
          <h3>LV. {leader.level}</h3>
          <b>{leader.levelName}</b>
          <p>{leader.xp.toLocaleString()} XP kumulatif</p>
          <div className="progress" style={{ width: 220 }}>
            <i style={{ width: `${progress}%` }} />
          </div>
          <p>Level dihitung dari XP Qualification mingguan.</p>
        </div>
      </div>

      <div className="levels">
        {LEVELS.map((lvl) => (
          <div className={`lvl${leader.level >= Number(lvl.num.slice(-1)) ? " on" : ""}`} key={lvl.name}>
            <div className="level-badge">
              <Icon name={lvl.icon} size={18} />
            </div>
            {lvl.num}
            <br />
            {lvl.name}
          </div>
        ))}
      </div>
    </div>
  );
}
