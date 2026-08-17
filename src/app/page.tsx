"use client";

import Link from "next/link";
import { useApp } from "@/components/app-provider";
import KpiCard from "@/components/ui/KpiCard";
import Icon from "@/components/ui/Icon";
import PerformanceChart from "@/components/dashboard/PerformanceChart";
import Podium from "@/components/dashboard/Podium";
import TeamLevelProgress from "@/components/dashboard/TeamLevelProgress";
import MissionItem from "@/components/missions/MissionItem";
import AchievementRow from "@/components/achievements/AchievementRow";
import { missions } from "@/lib/data";
import { ArrowRight } from "lucide-react";

export default function DashboardPage() {
  const { snapshot, isPerformanceLoading, performanceError } = useApp();

  if (isPerformanceLoading) {
    return (
      <div className="page skeleton" aria-label="Memuat data spreadsheet">
        <div className="bars"><div className="row" /><div className="row" /><div className="row" /></div>
        <div className="row" />
      </div>
    );
  }

  if (!snapshot) {
    return (
      <div className="page">
        <div className="card panel empty-state">
          <span className="empty-icon">⚠️</span>
          <b>Data spreadsheet belum tersedia</b>
          {performanceError ?? "Pilih periode setelah koneksi spreadsheet berhasil."}
        </div>
      </div>
    );
  }

  const { data, achievements } = snapshot;
  const performanceRate = data.total ? Math.round((data.perform / data.total) * 100) : 0;
  const underperformRate = data.total ? Math.round((data.under / data.total) * 100) : 0;

  return (
    <div className="page">
      <section className="grid6">
        <KpiCard icon="users" label="Total BA" value={data.total} footer="Nama BA pada periode ini" />
        <KpiCard icon="star" label="Avg Rating Review" value={data.review.toFixed(1)} footer="Rata-rata data tersedia" />
        <KpiCard icon="shopping-cart" label="Avg X2C" value={data.x2c.toFixed(1)} footer="Rata-rata data tersedia" />
        <KpiCard icon="shopping-bag" label="Avg Sellout" value={`${data.sellout.toFixed(1)}%`} footer="Rata-rata data tersedia" />
        <KpiCard icon="dumbbell" label="BA Perform" value={data.perform} footer={`${data.goodPerform ?? 0} Good Perform • ${performanceRate}%`} />
        <KpiCard
          icon="alert"
          label="BA Underperform"
          value={data.under}
          footer={`${underperformRate}% dari total BA`}
          tone="danger"
        />
      </section>

      <section className="content">
        <div className="card panel">
          <div className="toolbar">
            <div>
              <h2>Performance overview</h2>
              <div className="sub">Weekly team performance trend</div>
            </div>
            <div className="legend">
              <span className="l1">Sellout (%)</span>
              <span className="l2">X2C</span>
              <span className="l3">Rating Review</span>
            </div>
          </div>

          <PerformanceChart data={data} />

          <div className="summary">
            <div className="mini">
              <small><Icon name="shopping-bag" size={13} className="inline-icon" /> Total Sellout</small>
              <strong>{data.totalSellout?.toFixed(1) ?? "0"}%</strong>
              <span className="sub">Akumulasi periode terpilih</span>
            </div>
            <div className="mini">
              <small><Icon name="shopping-cart" size={13} className="inline-icon" /> Total X2C</small>
              <strong>{data.totalX2c?.toLocaleString() ?? "0"}</strong>
              <span className="sub">Akumulasi periode terpilih</span>
            </div>
            <div className="mini">
              <small><Icon name="star" size={13} className="inline-icon" /> Total Rating Review</small>
              <strong>{data.totalReview?.toLocaleString() ?? "0"}</strong>
              <span className="sub">Akumulasi periode terpilih</span>
            </div>
            <div className="mini">
              <small><Icon name="target" size={13} className="inline-icon" /> Good Perform</small>
              <strong>{data.goodPerform ?? 0} BA</strong>
              <div className="progress" style={{ marginTop: 5 }}>
                <i style={{ width: `${data.total ? ((data.goodPerform ?? 0) / data.total) * 100 : 0}%` }} />
              </div>
            </div>
          </div>
        </div>

        <Podium />
      </section>

      <section className="missions">
        <div className="card panel">
          <div className="toolbar">
            <h2>Weekly missions</h2>
            <Link className="btn" href="/missions">
              View All <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
          {missions.slice(0, 3).map((m) => (
            <MissionItem key={m.title} mission={m} compact />
          ))}
          <div className="sub" style={{ marginTop: 12 }}>
            <Icon name="calendar" size={13} className="inline-icon" /> Mission reset every Monday 00.00
          </div>
        </div>

        <TeamLevelProgress />
      </section>

      <section className="card panel achievements">
        <div className="toolbar">
          <h2>Recent achievements</h2>
          <Link className="btn" href="/achievements">
            View All <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
        {achievements.length > 0 ? (
          achievements.slice(0, 4).map((a) => <AchievementRow key={`${a.title}-${a.owner}`} achievement={a} />)
        ) : (
          <p className="sub">Belum ada achievement yang dapat dihitung pada periode ini.</p>
        )}
      </section>
    </div>
  );
}
