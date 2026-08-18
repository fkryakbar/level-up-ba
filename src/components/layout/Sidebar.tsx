"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PROFILE } from "@/lib/data";
import { getAvatarEmoji } from "@/lib/initials";
import {
  Award,
  BarChart3,
  Gift,
  History,
  LayoutDashboard,
  Settings,
  Target,
  Trophy,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const NAV: { href: string; icon: LucideIcon; label: string }[] = [
  { href: "/", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/achievements", icon: Award, label: "Achievements" },
  { href: "/missions", icon: Target, label: "Missions" },
  { href: "/rewards", icon: Gift, label: "Rewards Store" },
  { href: "/leaderboard", icon: Trophy, label: "Leaderboard" },
  { href: "/history", icon: History, label: "History" },
  { href: "/analytics", icon: BarChart3, label: "Analytics" },
  { href: "/settings", icon: Settings, label: "Settings" },
];

export default function Sidebar({ open, onNavigate }: { open: boolean; onNavigate: () => void }) {
  const pathname = usePathname();

  return (
    <aside className={`sidebar${open ? " open" : ""}`}>
      <div className="logo">
        LEVEL UP <b className="logo-icon">★</b>
        <div className="tag">PLAY • PERFORM • PROGRESS</div>
      </div>

      <nav className="nav">
        {NAV.map((item) => {
          const active = pathname === item.href;
          const NavIcon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={active ? "active" : undefined}
              onClick={onNavigate}
            >
              <span className="nav-icon">
                <NavIcon size={16} aria-hidden="true" />
              </span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="profile">
        <div className="avatar">{PROFILE.avatar || getAvatarEmoji(PROFILE.name)}</div>
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