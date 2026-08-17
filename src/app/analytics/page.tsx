"use client";

import PageHeader from "@/components/ui/PageHeader";
import Icon from "@/components/ui/Icon";
import SparkBars from "@/components/analytics/SparkBars";
import { useApp } from "@/components/app-provider";
import { RefreshCw } from "lucide-react";

function toBars(values: number[]): number[] {
  const maximum = Math.max(...values, 1);
  return values.map((value) => Math.max(8, Math.round((value / maximum) * 100)));
}

export default function AnalyticsPage() {
  const {
    snapshot,
    isPerformanceLoading,
    performanceError,
    refreshPerformance,
    showToast,
  } = useApp();

  const refresh = async () => {
    await refreshPerformance();
    showToast("Analytics diperbarui dari spreadsheet.");
  };

  if (isPerformanceLoading) {
    return <div className="page skeleton"><div className="bars"><div className="row" /><div className="row" /><div className="row" /></div><div className="row" /></div>;
  }

  if (!snapshot) {
    return (
      <div className="page">
        <PageHeader title="Analytics" subtitle="Analisis berdasarkan spreadsheet." />
        <div className="card panel empty-state"><span className="empty-icon">⚠️</span><b>Analytics belum tersedia</b>{performanceError}</div>
      </div>
    );
  }

  const { data, baData } = snapshot;
  const total = Math.max(data.total, 1);
  const goodRate = ((data.goodPerform ?? 0) / total) * 100;
  const performOnly = Math.max(data.perform - (data.goodPerform ?? 0), 0);
  const performRate = (performOnly / total) * 100;
  const underRate = (data.under / total) * 100;
  const averageXp = baData.reduce((sum, record) => sum + record.xp, 0) / Math.max(baData.length, 1);
  const x2cSeries = data.x2cSeries;
  const x2cDelta = x2cSeries.length >= 2 ? x2cSeries.at(-1)! - x2cSeries.at(-2)! : null;
  const topXp = baData[0];
  const metrics = [
    { key: "good", title: "Good Perform Rate", big: `${goodRate.toFixed(1)}%`, tone: "delta", note: `${data.goodPerform ?? 0} BA`, bars: toBars(data.x2cSeries) },
    { key: "perform", title: "Perform Rate", big: `${performRate.toFixed(1)}%`, tone: "delta", note: `${performOnly} BA`, bars: toBars(data.reviewSeries) },
    { key: "underperform", title: "Underperform Rate", big: `${underRate.toFixed(1)}%`, tone: "danger", note: `${data.under} BA`, bars: toBars(data.selloutSeries) },
    { key: "avgxp", title: "Avg XP / BA", big: averageXp.toFixed(0), tone: "delta", note: "XP kumulatif", bars: toBars(data.x2cSeries) },
  ];
  const segments = [
    { label: "Good Perform", value: goodRate, count: data.goodPerform ?? 0 },
    { label: "Perform", value: performRate, count: performOnly },
    { label: "Underperform", value: underRate, count: data.under },
  ];
  const insights = [
    {
      icon: "alert",
      title: "Status underperform",
      text: `${data.under} dari ${data.total} BA memiliki Qualification Underperform pada ${snapshot.period.label}.`,
    },
    {
      icon: "trending-up",
      title: "Perubahan rata-rata X2C",
      text: x2cDelta === null ? "Belum ada minggu pembanding pada bulan ini." : `Rata-rata X2C ${x2cDelta >= 0 ? "naik" : "turun"} ${Math.abs(x2cDelta).toFixed(1)} dari minggu sebelumnya.`,
    },
    {
      icon: "trophy",
      title: "XP tertinggi",
      text: topXp ? `${topXp.name} memimpin dengan ${topXp.xp.toLocaleString()} XP dan streak ${topXp.streak} minggu.` : "Belum ada data XP.",
    },
  ];

  return (
    <div className="page">
      <PageHeader
        title="Analytics"
        subtitle={`Analisis ${snapshot.period.label} dari spreadsheet.`}
        action={<button className="btn" onClick={refresh}><RefreshCw size={14} aria-hidden="true" /> Refresh</button>}
      />

      <div className="grid4">
        {metrics.map((metric) => (
          <div className="metric-block card" key={metric.key}>
            <h3>{metric.title}</h3>
            <div className="metric-big">{metric.big}</div>
            <span className={metric.tone}>{metric.note}</span>
            <SparkBars values={metric.bars} />
          </div>
        ))}
      </div>

      <div className="grid2">
        <div className="card panel">
          <h2>Performance segmentation</h2>
          <div style={{ marginTop: 14, display: "grid", gap: 12 }}>
            {segments.map((segment) => (
              <div key={segment.label}>
                <div className="mission-head">
                  <b>{segment.label}</b>
                  <b>{segment.count} BA • {segment.value.toFixed(1)}%</b>
                </div>
                <div className="progress"><i style={{ width: `${segment.value}%` }} /></div>
              </div>
            ))}
          </div>
        </div>

        <div className="card panel">
          <h2>Actionable insights</h2>
          <div className="notification-list" style={{ marginTop: 12 }}>
            {insights.map((insight) => (
              <div className="notification-item" key={insight.title}>
                <div className="notification-icon"><Icon name={insight.icon} size={16} /></div>
                <div><b>{insight.title}</b><p>{insight.text}</p></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
