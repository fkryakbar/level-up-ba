"use client";

import PageHeader from "@/components/ui/PageHeader";
import KpiCard from "@/components/ui/KpiCard";
import AchievementCard from "@/components/achievements/AchievementCard";
import { useApp } from "@/components/app-provider";

export default function AchievementsPage() {
  const { snapshot, isPerformanceLoading, performanceError } = useApp();

  if (isPerformanceLoading) {
    return <div className="page skeleton"><div className="bars"><div className="row" /><div className="row" /><div className="row" /></div><div className="row" /></div>;
  }

  if (!snapshot) {
    return (
      <div className="page">
        <PageHeader title="Achievements" subtitle="Achievement yang diturunkan dari data performance." />
        <div className="card panel empty-state"><span className="empty-icon">⚠️</span><b>Achievement belum tersedia</b>{performanceError}</div>
      </div>
    );
  }

  const leader = snapshot.baData[0];
  const longestStreak = Math.max(...snapshot.baData.map((record) => record.streak), 0);
  const mostImproved = [...snapshot.baData]
    .filter((record) => record.x2cImprovement !== null)
    .sort((a, b) => (b.x2cImprovement ?? 0) - (a.x2cImprovement ?? 0))[0];

  return (
    <div className="page">
      <PageHeader
        title="Achievements"
        subtitle={`Achievement yang dihitung dari ${snapshot.period.label}.`}
      />

      <div className="grid4">
        <KpiCard icon="trophy" label="Achievement Available" value={snapshot.achievements.length} footer="Dihitung dari data periode" />
        <KpiCard icon="flame" label="Longest Streak" value={`${longestStreak} minggu`} footer="XP sama atau meningkat" />
        <KpiCard icon="crown" label="Top Performer" value={leader?.name ?? "—"} footer={leader ? `${leader.xp.toLocaleString()} XP • ${leader.levelName}` : "Belum ada data"} />
        <KpiCard icon="rocket" label="Most Improved" value={mostImproved ? `+${mostImproved.x2cImprovement}` : "—"} footer={mostImproved?.name ?? "Belum ada pembanding"} />
      </div>

      <div className="grid-feature">
        {snapshot.achievements.length > 0 ? (
          snapshot.achievements.map((achievement) => (
            <AchievementCard key={`${achievement.title}-${achievement.owner}`} achievement={achievement} />
          ))
        ) : (
          <div className="card panel empty-state"><span className="empty-icon">🏅</span><b>Belum ada achievement yang memenuhi aturan</b></div>
        )}
      </div>
    </div>
  );
}
