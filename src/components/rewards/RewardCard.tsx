"use client";

import { useApp } from "@/components/app-provider";
import Icon from "@/components/ui/Icon";
import { PROFILE } from "@/lib/data";
import type { Reward } from "@/lib/types";

export default function RewardCard({ reward }: { reward: Reward }) {
  const { openModal, showToast } = useApp();
  const locked = reward.cost > PROFILE.balance;

  const handleRedeem = () => {
    if (locked) {
      showToast(
        `Need ${(reward.cost - PROFILE.balance).toLocaleString()} more XP to unlock ${reward.title}.`
      );
      return;
    }
    openModal({
      title: "Redeem Reward",
      body: (
        <p style={{ fontSize: 12, color: "var(--muted)", lineHeight: 1.6 }}>
          Redeem <b style={{ color: "white" }}>{reward.title}</b> for{" "}
          <b style={{ color: "var(--gold)" }}>{reward.cost.toLocaleString()} XP</b>?
        </p>
      ),
      confirmText: "Redeem",
      onConfirm: () => showToast(`${reward.title} redemption request submitted.`),
    });
  };

  return (
    <div className="card reward-card">
      <span
        className={`badge-status ${reward.stock <= 3 ? "status-warn" : "status-info"} stock`}
      >
        {reward.stock} left
      </span>
      <div className="reward-icon">
        <Icon name={reward.icon} size={32} strokeWidth={1.75} />
      </div>
      <h3>{reward.title}</h3>
      <p>{reward.desc}</p>
      <div className="reward-cost">
        <strong style={{ color: "var(--gold)" }}>{reward.cost.toLocaleString()} XP</strong>
        <button className={`btn ${locked ? "" : "primary"}`} onClick={handleRedeem}>
          {locked ? "Locked" : "Redeem"}
        </button>
      </div>
    </div>
  );
}