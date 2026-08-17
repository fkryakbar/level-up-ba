import Icon from "@/components/ui/Icon";
import type { Achievement } from "@/lib/types";

export default function AchievementCard({ achievement }: { achievement: Achievement }) {
  return (
    <div className="card panel">
      <div className="achievement-big">
        <Icon name={achievement.icon} size={32} strokeWidth={1.75} />
      </div>
      <h3>{achievement.title}</h3>
      <div className="achievement-owner">{achievement.owner}</div>
      <p className="sub achievement-desc">{achievement.desc}</p>
      <div className="divider" />
      <span className="time">{achievement.time}</span>
    </div>
  );
}