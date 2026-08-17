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
import { achievements, datasets, missions } from "@/lib/data";
import { ArrowRight } from "lucide-react";

export default function DashboardPage() {
  const { period } = useApp();
  const data = datasets[period];

  return (
    <div className="page">
      <section className="grid6">
        <KpiCard icon="users" label="Total BA" value={data.total} footer="Active Member" />
        <KpiCard icon="star" label="Avg Rating Review" value={data.review} footer="↗ 5.6% vs Last Week" />
        <KpiCard icon="shopping-cart" label="Avg X2C" value={data.x2c} footer="↗ 8.3% vs Last Week" />
        <KpiCard icon="shopping-bag" label="Avg Sellout" value={`${data.sellout}%`} footer="↗ 4.1% vs Last Week" />
        <KpiCard icon="dumbbell" label="BA Perform" value={data.perform} footer="15% of Total BA" />
        <KpiCard
          icon="alert"
          label="BA Underperform"
          value={data.under}
          footer="77.5% of Total BA"
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
              <strong>216%</strong>
              <span className="delta">↗ 21% vs LW</span>
            </div>
            <div className="mini">
              <small><Icon name="shopping-cart" size={13} className="inline-icon" /> Total X2C</small>
              <strong>3,144</strong>
              <span className="delta">↗ 12% vs LW</span>
            </div>
            <div className="mini">
              <small><Icon name="star" size={13} className="inline-icon" /> Total Rating Review</small>
              <strong>448</strong>
              <span className="delta">↗ 9% vs LW</span>
            </div>
            <div className="mini">
              <small><Icon name="target" size={13} className="inline-icon" /> Target Sellout</small>
              <strong>21.6%</strong>
              <div className="progress" style={{ marginTop: 5 }}>
                <i style={{ width: "84%" }} />
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
        {achievements.slice(0, 4).map((a) => (
          <AchievementRow key={a.title} achievement={a} />
        ))}
      </section>
    </div>
  );
}