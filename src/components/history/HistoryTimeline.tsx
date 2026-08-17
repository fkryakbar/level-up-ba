"use client";

import { useState } from "react";
import { historyItems } from "@/lib/data";

type Filter = "all" | "xp" | "mission" | "reward";

export default function HistoryTimeline() {
  const [filter, setFilter] = useState<Filter>("all");
  const items =
    filter === "all" ? historyItems : historyItems.filter((x) => x.type === filter);

  return (
    <div className="card panel">
      <div className="toolbar">
        <h2>Recent Activity</h2>
        <select
          className="input"
          style={{ width: "auto" }}
          value={filter}
          onChange={(e) => setFilter(e.target.value as Filter)}
        >
          <option value="all">All Activity</option>
          <option value="xp">XP</option>
          <option value="mission">Mission</option>
          <option value="reward">Reward</option>
        </select>
      </div>
      <div className="timeline">
        {items.map((item) => (
          <div className="timeline-item" key={item.title}>
            <div className="timeline-dot" />
            <h4>
              {item.icon} {item.title}
            </h4>
            <p>
              {item.text} • {item.time}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}