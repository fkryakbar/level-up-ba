"use client";

import { useEffect, useState } from "react";
import { useApp } from "@/components/app-provider";

export default function NewMissionForm({
  submitRef,
}: {
  submitRef: React.RefObject<(() => void) | null>;
}) {
  const { showToast } = useApp();
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [target, setTarget] = useState(100);
  const [reward, setReward] = useState(100);
  const [errors, setErrors] = useState<{ name?: string; target?: string }>({});

  useEffect(() => {
    submitRef.current = () => {
      const next: { name?: string; target?: string } = {};
      if (!name.trim()) next.name = "Mission name is required.";
      if (!target || target <= 0) next.target = "Target must be greater than 0.";
      setErrors(next);
      if (Object.keys(next).length > 0) return;
      showToast(`Mission "${name.trim()}" created.`);
    };
  }, [name, target, showToast, submitRef]);

  return (
    <div style={{ display: "grid", gap: 11 }}>
      <div className="input-group">
        <label htmlFor="mission-name">Mission name</label>
        <input
          id="mission-name"
          className={`input${errors.name ? " invalid" : ""}`}
          placeholder="Example: Weekend Booster"
          value={name}
          onChange={(e) => setName(e.target.value)}
          aria-invalid={!!errors.name}
        />
        {errors.name && <span className="form-error">{errors.name}</span>}
      </div>
      <div className="input-group">
        <label htmlFor="mission-desc">Description</label>
        <input
          id="mission-desc"
          className="input"
          placeholder="Mission objective"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
      </div>
      <div className="grid2" style={{ margin: 0 }}>
        <div className="input-group">
          <label htmlFor="mission-target">Target</label>
          <input
            id="mission-target"
            className={`input${errors.target ? " invalid" : ""}`}
            type="number"
            value={target}
            onChange={(e) => setTarget(Number(e.target.value))}
            aria-invalid={!!errors.target}
          />
          {errors.target && <span className="form-error">{errors.target}</span>}
        </div>
        <div className="input-group">
          <label htmlFor="mission-reward">Reward XP</label>
          <input
            id="mission-reward"
            className="input"
            type="number"
            value={reward}
            onChange={(e) => setReward(Number(e.target.value))}
          />
        </div>
      </div>
    </div>
  );
}