"use client";

import PageHeader from "@/components/ui/PageHeader";
import RewardCard from "@/components/rewards/RewardCard";
import { rewards } from "@/lib/data";

export default function RewardsPage() {
  return (
    <div className="page">
      <PageHeader
        title="Rewards Store"
        subtitle="Redeem earned XP for incentives and recognition rewards."
        action={<span className="badge-status status-info">Available Balance: 1,250 XP</span>}
      />

      <div className="reward-grid">
        {rewards.map((r) => (
          <RewardCard key={r.title} reward={r} />
        ))}
      </div>
    </div>
  );
}