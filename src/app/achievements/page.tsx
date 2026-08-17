"use client";

import { useRef } from "react";
import { Plus } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import KpiCard from "@/components/ui/KpiCard";
import AchievementCard from "@/components/achievements/AchievementCard";
import AwardForm from "@/components/modals/AwardForm";
import { useApp } from "@/components/app-provider";
import { achievements } from "@/lib/data";

export default function AchievementsPage() {
  const { openModal } = useApp();
  const submitRef = useRef<(() => void) | null>(null);

  return (
    <div className="page">
      <PageHeader
        title="Achievements"
        subtitle="Track badges, milestones, and outstanding performance."
        action={
          <button
            className="btn primary"
            onClick={() =>
              openModal({
                title: "Give Achievement",
                body: <AwardForm submitRef={submitRef} />,
                confirmText: "Award",
                onConfirm: () => submitRef.current?.(),
              })
            }
          >
            <Plus size={16} aria-hidden="true" /> Give Achievement
          </button>
        }
      />

      <div className="grid4">
        <KpiCard icon="trophy" label="Achievement Issued" value="128" footer="+17 this month" />
        <KpiCard icon="flame" label="Active Streak" value="18" footer="BA with ≥ 2 week streak" />
        <KpiCard icon="crown" label="Top Performer" value="Pahriah" footer="1,420 XP" />
        <KpiCard icon="rocket" label="Most Improved" value="+18%" footer="Norcahyanti" />
      </div>

      <div className="grid-feature">
        {achievements.map((a) => (
          <AchievementCard key={a.title} achievement={a} />
        ))}
      </div>
    </div>
  );
}