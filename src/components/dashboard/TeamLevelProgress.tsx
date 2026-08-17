import Icon from "@/components/ui/Icon";
import { LEVELS, PROFILE } from "@/lib/data";

export default function TeamLevelProgress() {
  return (
    <div className="card panel">
      <h2>Team level progress</h2>
      <div className="levelpanel">
        <div className="shield">
          <Icon name="shield" size={44} strokeWidth={1.75} />
        </div>
        <div className="levelcopy">
          <div className="level-label">Current level</div>
          <h3>LV. {PROFILE.level}</h3>
          <b>{PROFILE.title}</b>
          <p>{PROFILE.xp}</p>
          <div className="progress" style={{ width: 220 }}>
            <i style={{ width: `${PROFILE.xpProgress}%` }} />
          </div>
          <p>Keep earning XP to reach the next level!</p>
        </div>
      </div>

      <div className="levels">
        {LEVELS.map((lvl) => (
          <div className={`lvl${lvl.reached ? " on" : ""}`} key={lvl.name}>
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