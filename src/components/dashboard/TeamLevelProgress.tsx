import { LEVELS, PROFILE } from "@/lib/data";

export default function TeamLevelProgress() {
  return (
    <div className="card panel">
      <h2>TEAM LEVEL PROGRESS</h2>
      <div className="levelpanel">
        <div className="shield">
          <span>★</span>
        </div>
        <div className="levelcopy">
          <div style={{ fontSize: 10, color: "#9cb0c8" }}>CURRENT LEVEL</div>
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
            <div className="level-badge">{lvl.icon}</div>
            {lvl.num}
            <br />
            {lvl.name}
          </div>
        ))}
      </div>
    </div>
  );
}