"use client";

import { useState } from "react";

export default function ToggleSwitch({ defaultOn = false }: { defaultOn?: boolean }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <button
      className={`switch${on ? " on" : ""}`}
      onClick={() => setOn(!on)}
      aria-pressed={on}
    >
      <i />
    </button>
  );
}