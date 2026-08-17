"use client";

import { useEffect, useState } from "react";
import { useApp } from "@/components/app-provider";
import { AWARD_OPTIONS, baData } from "@/lib/data";

export default function AwardForm({
  submitRef,
}: {
  submitRef: React.RefObject<(() => void) | null>;
}) {
  const { showToast } = useApp();
  const [ba, setBa] = useState("");
  const [award, setAward] = useState("");
  const [note, setNote] = useState("");
  const [errors, setErrors] = useState<{ ba?: string; award?: string }>({});

  useEffect(() => {
    submitRef.current = () => {
      const next: { ba?: string; award?: string } = {};
      if (!ba) next.ba = "Select a brand ambassador.";
      if (!award) next.award = "Select an achievement.";
      setErrors(next);
      if (Object.keys(next).length > 0) return;
      showToast(`Achievement awarded to ${ba}.`);
    };
  }, [ba, award, showToast, submitRef]);

  return (
    <div style={{ display: "grid", gap: 11 }}>
      <div className="input-group">
        <label htmlFor="award-ba">Brand Ambassador</label>
        <select
          id="award-ba"
          className={`input${errors.ba ? " invalid" : ""}`}
          value={ba}
          onChange={(e) => setBa(e.target.value)}
          aria-invalid={!!errors.ba}
        >
          <option value="">Select BA</option>
          {baData.map((u) => (
            <option key={u.name}>{u.name}</option>
          ))}
        </select>
        {errors.ba && <span className="form-error">{errors.ba}</span>}
      </div>
      <div className="input-group">
        <label htmlFor="award-type">Achievement</label>
        <select
          id="award-type"
          className={`input${errors.award ? " invalid" : ""}`}
          value={award}
          onChange={(e) => setAward(e.target.value)}
          aria-invalid={!!errors.award}
        >
          <option value="">Select achievement</option>
          {AWARD_OPTIONS.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
        {errors.award && <span className="form-error">{errors.award}</span>}
      </div>
      <div className="input-group">
        <label htmlFor="award-note">Note</label>
        <input
          id="award-note"
          className="input"
          placeholder="Optional note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
      </div>
    </div>
  );
}