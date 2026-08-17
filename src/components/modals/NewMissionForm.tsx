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

  useEffect(() => {
    submitRef.current = () => {
      const trimmed = name.trim();
      if (trimmed) showToast(`Mission "${trimmed}" created.`);
      else showToast("Mission created.");
    };
  }, [name, showToast, submitRef]);

  return (
    <div style={{ display: "grid", gap: 11 }}>
      <div className="input-group">
        <label>Mission name</label>
        <input
          className="input"
          placeholder="Example: Weekend Booster"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="input-group">
        <label>Description</label>
        <input
          className="input"
          placeholder="Mission objective"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
      </div>
      <div className="grid2" style={{ margin: 0 }}>
        <div className="input-group">
          <label>Target</label>
          <input
            className="input"
            type="number"
            value={target}
            onChange={(e) => setTarget(Number(e.target.value))}
          />
        </div>
        <div className="input-group">
          <label>Reward XP</label>
          <input
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