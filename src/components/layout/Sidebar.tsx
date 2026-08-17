"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PROFILE } from "@/lib/data";

const NAV = [
  { href: "/", icon: "⌂", label: "Dashboard" },
  { href: "/achievements", icon: "🏅", label: "Achievements" },
  { href: "/missions", icon: "🎯", label: "Missions" },
  { href: "/rewards", icon: "🎁", label: "Rewards Store" },
  { href: "/leaderboard", icon: "🏆", label: "Leaderboard" },
  { href: "/history", icon: "◷", label: "History" },
  { href: "/analytics", icon: "▥", label: "Analytics" },
  { href: "/settings", icon: "⚙", label: "Settings" },
];

export default function Sidebar({ open, onNavigate }: { open: boolean; onNavigate: () => void }) {
  const pathname = usePathname();

  return (
    <aside className={`sidebar${open ? " open" : ""}`}>
      <div className="logo">
        LEVEL <span>UP</span> <b>☆</b>
        <div className="tag">PLAY • PERFORM • PROGRESS</div>
      </div>

      <nav className="nav">
        {NAV.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={active ? "active" : undefined}
              onClick={onNavigate}
            >
              <span className="nav-icon">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="profile">
        <div className="avatar">👩🏻</div>
        <b>{PROFILE.name}</b>
        <br />
        <small>{PROFILE.role}</small>
        <div style={{ marginTop: 10, textAlign: "left", fontSize: 11 }}>
          LV. {PROFILE.level} &nbsp; <b>{PROFILE.title}</b>
        </div>
        <div className="levelbar">
          <i />
        </div>
        <small>{PROFILE.xp}</small>
      </div>
    </aside>
  );
}