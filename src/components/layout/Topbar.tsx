"use client";

import { usePathname } from "next/navigation";
import { useApp } from "@/components/app-provider";
import NotificationList from "@/components/notifications/NotificationList";
import { PAGE_META, PROFILE } from "@/lib/data";
import { Bell, Cloud, Menu, Gem } from "lucide-react";

export default function Topbar({ onMenu }: { onMenu: () => void }) {
  const pathname = usePathname();
  const {
    period,
    setPeriod,
    periods,
    snapshot,
    isPerformanceLoading,
    notifCount,
    setNotifCount,
    showToast,
    openModal,
  } = useApp();
  const meta = PAGE_META[pathname] ?? PAGE_META["/"];
  const topBa = snapshot?.baData[0];

  const openNotifications = () => {
    openModal({
      title: "Notifications",
      body: <NotificationList />,
      confirmText: "Mark all read",
      onConfirm: () => {
        setNotifCount(0);
        showToast("All notifications marked as read.");
      },
    });
  };

  // Add emoji trophy for leaderboard page header title if not present
  const titleWithIcon = pathname === "/leaderboard" && !meta.title.includes("🏆") 
    ? `${meta.title} 🏆` 
    : meta.title;

  return (
    <header className="topbar">
      <div className="top-left">
        <button className="menu-btn" onClick={onMenu} aria-label="Toggle menu">
          <Menu size={20} aria-hidden="true" />
        </button>
        <div className="greeting">
          <h1>{titleWithIcon}</h1>
          <p>{meta.subtitle}</p>
        </div>
      </div>

      <div className="top-actions">
        <select
          className="period-select"
          aria-label="Pilih periode"
          value={period}
          disabled={isPerformanceLoading || periods.length === 0}
          onChange={(e) => {
            const value = e.target.value;
            setPeriod(value);
            showToast(
              `Dashboard switched to ${e.target.options[e.target.selectedIndex].text}.`
            );
          }}
        >
          {periods.length === 0 && <option value="">Demo Data — Sheet kosong/tidak terbaca</option>}
          {periods.map((p) => (
            <option key={p.key} value={p.key}>
              {p.label}
            </option>
          ))}
        </select>

        <div className="pill demo-pill" title="Demo Mode Active">
          <Cloud size={14} aria-hidden="true" /> <span>Demo</span>
        </div>

        <button className="pill button" onClick={openNotifications} aria-label="Notifications">
          <Bell size={15} aria-hidden="true" /> <span>{notifCount}</span>
        </button>

        <div className="pill level-pill">
          <Gem size={14} className="gem-icon" aria-hidden="true" />
          <span>
            <b>LV. {topBa ? topBa.level : PROFILE.level}</b>{" "}
            <span className="level-title">{topBa ? topBa.levelName : PROFILE.title}</span>
          </span>
        </div>
      </div>
    </header>
  );
}

