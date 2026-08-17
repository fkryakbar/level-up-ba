import PageHeader from "@/components/ui/PageHeader";
import HistoryTimeline from "@/components/history/HistoryTimeline";

const DISTRIBUTION = [
  { label: "Performance XP", value: "62%", width: "62%" },
  { label: "Mission XP", value: "24%", width: "24%" },
  { label: "Achievement XP", value: "9%", width: "9%" },
  { label: "Bonus XP", value: "5%", width: "5%" },
];

export default function HistoryPage() {
  return (
    <div className="page">
      <PageHeader
        title="History"
        subtitle="Recent XP, reward redemption, mission, and achievement events."
      />

      <div className="grid2">
        <HistoryTimeline />

        <div className="card panel">
          <h2>XP Distribution</h2>
          <div className="grid2">
            {DISTRIBUTION.map((d) => (
              <div className="metric-block" key={d.label}>
                <h3>{d.label}</h3>
                <div className="metric-big">{d.value}</div>
                <div className="progress">
                  <i style={{ width: d.width }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}