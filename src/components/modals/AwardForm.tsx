"use client";

import { useEffect } from "react";
import { useApp } from "@/components/app-provider";
import { AWARD_OPTIONS, baData } from "@/lib/data";

export default function AwardForm({
  submitRef,
}: {
  submitRef: React.RefObject<(() => void) | null>;
}) {
  const { showToast } = useApp();

  useEffect(() => {
    submitRef.current = () => showToast("Achievement awarded successfully.");
  }, [showToast, submitRef]);

  return (
    <div style={{ display: "grid", gap: 11 }}>
      <div className="input-group">
        <label>Brand Ambassador</label>
        <select className="input">
          {baData.map((u) => (
            <option key={u.name}>{u.name}</option>
          ))}
        </select>
      </div>
      <div className="input-group">
        <label>Achievement</label>
        <select className="input">
          {AWARD_OPTIONS.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      </div>
      <div className="input-group">
        <label>Note</label>
        <input className="input" placeholder="Optional note" />
      </div>
    </div>
  );
}