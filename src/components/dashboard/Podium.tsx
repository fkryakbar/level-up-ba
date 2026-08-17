"use client";

import Link from "next/link";
import { baData } from "@/lib/data";

const ORDER = [1, 0, 2];
const MEDALS = ["🥈", "🥇", "🥉"];

export default function Podium() {
  return (
    <div className="card panel leaderboard">
      <div className="toolbar">
        <h2>TOP LEADERBOARD</h2>
        <Link className="btn" href="/leaderboard">
          View All →
        </Link>
      </div>

      <div className="podium">
        {ORDER.map((i, pos) => {
          const user = baData[i];
          return (
            <div className={`person${pos === 1 ? " first" : ""}`} key={user.name}>
              <div className="medal">{MEDALS[pos]}</div>
              <div className="face">{user.avatar}</div>
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
            <span className="miniavatar">{user.avatar}</span>
            {user.name}
          </div>
          <strong style={{ color: "#65e5d8" }}>{user.xp.toLocaleString()} XP</strong>
        </div>
      ))}
    </div>
  );
}