import Icon from "@/components/ui/Icon";
import type { Achievement } from "@/lib/types";

export default function AchievementRow({ achievement }: { achievement: Achievement }) {
  return (
    <div className="achievement">
      <div className="icon">
        <Icon name={achievement.icon} size={16} />
      </div>
      <div>
        <b>
          {achievement.owner} earned {achievement.title}
        </b>
        <small>{achievement.desc}</small>
      </div>
      <span className="time">{achievement.time}</span>
    </div>
  );
}