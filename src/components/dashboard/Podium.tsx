"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { initials } from "@/lib/initials";
import { useApp } from "@/components/app-provider";

const ORDER = [1, 0, 2];
const MEDAL_EMOJIS = ["🥈", "🥇", "🥉"];

export default function Podium() {
  const { snapshot } = useApp();
  const baData = snapshot?.baData ?? [];
  const podiumUsers = ORDER.map((index) => baData[index]).filter(Boolean);

  return (
    <div className="card panel leaderboard">
      <div className="toolbar">
        <h2>Top leaderboard</h2>
        <Link className="btn" href="/leaderboard">
          View All <ArrowRight size={13} aria-hidden="true" />
        </Link>
      </div>

      <div className="podium">
        {podiumUsers.map((user, pos) => {
          return (
            <div className={`person${pos === 1 ? " first" : ""}`} key={user.name}>
              <div className="medal" aria-hidden="true">
                {MEDAL_EMOJIS[pos]}
              </div>
              <div className="face">{initials(user.name)}</div>
              <b>{user.name}</b>
              <div className="xp">{user.xp.toLocaleString()} XP</div>
            </div>
          );
        })}
      </div>

      {baData.slice(3, 8).map((user, index) => (
        <div className="rankrow" key={user.name}>
          <b>{index + 4}</b>
          <div className="usercell">
            <span className="miniavatar">{initials(user.name)}</span>
            {user.name}
          </div>
          <strong style={{ color: "var(--accent)" }}>{user.xp.toLocaleString()} XP</strong>
        </div>
      ))}
    </div>
  );
}
