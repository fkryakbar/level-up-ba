"use client";

import PageHeader from "@/components/ui/PageHeader";
import SparkBars from "@/components/analytics/SparkBars";
import { useApp } from "@/components/app-provider";

const METRICS = [
  { key: "engagement", title: "Team Engagement", big: "84%", tone: "delta", note: "↗ 7.2%", bars: [37, 52, 47, 68, 61, 76, 84] },
  { key: "mission", title: "Mission Completion", big: "71%", tone: "delta", note: "↗ 4.6%", bars: [45, 50, 54, 61, 57, 67, 71] },
  { key: "underperform", title: "Underperform Rate", big: "77.5%", tone: "danger", note: "Needs attention", bars: [84, 81, 82, 80, 79, 78, 77] },
  { key: "avgxp", title: "Avg XP / BA", big: "742", tone: "delta", note: "↗ 11.1%", bars: [43, 46, 49, 55, 59, 66, 74] },
];

const SEGMENTS = [
  { label: "Top Performers", value: "15%", width: "15%" },
  { label: "On Track", value: "7.5%", width: "7.5%" },
  { label: "Need Attention", value: "77.5%", width: "77.5%" },
];

const INSIGHTS = [
  { icon: "⚠️", title: "Underperform rate is high", text: "31 of 40 BA are currently under target. Prioritize coaching on X2C and sellout." },
  { icon: "📈", title: "X2C trend is improving", text: "Average X2C increased 8.3% from last week." },
  { icon: "⭐", title: "Review target opportunity", text: "Review Booster is at 73%; a targeted push can improve mission completion." },
];

export default function AnalyticsPage() {
  const { showToast } = useApp();

  return (
    <div className="page">
      <PageHeader
        title="Analytics"
        subtitle="Deeper team health, conversion, sellout, review, and engagement insights."
        action={<button className="btn" onClick={() => showToast("Analytics refreshed.")}>↻ Refresh</button>}
      />

      <div className="grid4">
        {METRICS.map((m) => (
          <div className="metric-block card" key={m.key}>
            <h3>{m.title}</h3>
            <div className="metric-big">{m.big}</div>
            <span className={m.tone}>{m.note}</span>
            <SparkBars values={m.bars} />
          </div>
        ))}
      </div>

      <div className="grid2">
        <div className="card panel">
          <h2>PERFORMANCE SEGMENTATION</h2>
          <div style={{ marginTop: 14, display: "grid", gap: 12 }}>
            {SEGMENTS.map((s) => (
              <div key={s.label}>
                <div className="mission-head">
                  <b>{s.label}</b>
                  <b>{s.value}</b>
                </div>
                <div className="progress">
                  <i style={{ width: s.width }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card panel">
          <h2>ACTIONABLE INSIGHTS</h2>
          <div className="notification-list" style={{ marginTop: 12 }}>
            {INSIGHTS.map((ins) => (
              <div className="notification-item" key={ins.title}>
                <div className="notification-icon">{ins.icon}</div>
                <div>
                  <b>{ins.title}</b>
                  <p>{ins.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}