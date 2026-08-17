"use client";

import { useState } from "react";
import Icon from "@/components/ui/Icon";
import { historyItems } from "@/lib/data";

type Filter = "all" | "xp" | "mission" | "reward";

export default function HistoryTimeline() {
  const [filter, setFilter] = useState<Filter>("all");
  const items =
    filter === "all" ? historyItems : historyItems.filter((x) => x.type === filter);

  return (
    <div className="card panel">
      <div className="toolbar">
        <h2>Recent activity</h2>
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
        {items.length === 0 ? (
          <div className="empty-state">
            <span className="empty-icon">
              <Icon name="inbox" size={30} />
            </span>
            <b>No activity in this category</b>
            Try a different filter to see more events.
          </div>
        ) : (
          items.map((item) => (
            <div className="timeline-item" key={item.title}>
              <div className="timeline-dot" />
              <h4>
                <Icon name={item.icon} size={16} className="inline-icon" /> {item.title}
              </h4>
              <p>
                {item.text} • {item.time}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}