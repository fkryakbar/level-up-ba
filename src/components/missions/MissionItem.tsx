import type { Mission } from "@/lib/types";

export default function MissionItem({
  mission,
  compact = false,
}: {
  mission: Mission;
  compact?: boolean;
}) {
  const pct = Math.min(100, Math.round((mission.current / mission.target) * 100));
  const done = pct >= 100;

  return (
    <div className="mission">
      <div className="mission-head">
        <b>
          {mission.icon} {mission.title}
        </b>
        <b style={{ color: done ? "var(--green)" : "var(--yellow)" }}>
          {mission.current}
          {mission.unit}/{mission.target}
          {mission.unit}
        </b>
      </div>
      <small>{mission.desc}</small>
      <div className="progress">
        <i style={{ width: `${pct}%` }} />
      </div>
      <span className="reward">+{mission.reward} XP</span>
      {!compact && (
        <div style={{ clear: "both", paddingTop: 9 }} className="sub">
          {pct}% completed
        </div>
      )}
    </div>
  );
}