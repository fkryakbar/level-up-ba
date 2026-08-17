import type { Achievement } from "@/lib/types";

export default function AchievementCard({ achievement }: { achievement: Achievement }) {
  return (
    <div className="card panel">
      <div style={{ fontSize: 38, marginBottom: 10 }}>{achievement.icon}</div>
      <h3>{achievement.title}</h3>
      <div style={{ fontSize: 11, color: "var(--teal)", marginTop: 5 }}>
        {achievement.owner}
      </div>
      <p className="sub" style={{ fontSize: 10, lineHeight: 1.5 }}>
        {achievement.desc}
      </p>
      <div className="divider" />
      <span className="time">{achievement.time}</span>
    </div>
  );
}