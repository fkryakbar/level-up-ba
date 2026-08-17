"use client";

import { useRef } from "react";
import { Plus } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import MissionItem from "@/components/missions/MissionItem";
import NewMissionForm from "@/components/modals/NewMissionForm";
import { useApp } from "@/components/app-provider";
import { missions } from "@/lib/data";

export default function MissionsPage() {
  const { openModal } = useApp();
  const submitRef = useRef<(() => void) | null>(null);

  return (
    <div className="page">
      <PageHeader
        title="Missions"
        subtitle="Weekly targets that reward consistent team performance."
        action={
          <button
            className="btn primary"
            onClick={() =>
              openModal({
                title: "Create Mission",
                body: <NewMissionForm submitRef={submitRef} />,
                confirmText: "Save",
                onConfirm: () => submitRef.current?.(),
              })
            }
          >
            <Plus size={16} aria-hidden="true" /> New Mission
          </button>
        }
      />

      <div className="grid-feature">
        {missions.map((m) => (
          <div className="card panel" key={m.title}>
            <MissionItem mission={m} />
          </div>
        ))}
      </div>

      <div className="card panel" style={{ marginTop: 12 }}>
        <div className="toolbar">
          <div>
            <h2>Mission Rules</h2>
            <div className="sub">How XP and mission completion are evaluated.</div>
          </div>
        </div>
        <div className="grid3">
          <div className="metric-block">
            <h3>Reset Schedule</h3>
            <div className="metric-big">Mon</div>
            <span className="sub">Every Monday 00.00</span>
          </div>
          <div className="metric-block">
            <h3>Completion Grace</h3>
            <div className="metric-big">24h</div>
            <span className="sub">Late data synchronization window</span>
          </div>
          <div className="metric-block">
            <h3>Max Weekly XP</h3>
            <div className="metric-big">500</div>
            <span className="sub">Per Brand Ambassador</span>
          </div>
        </div>
      </div>
    </div>
  );
}