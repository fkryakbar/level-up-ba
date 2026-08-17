"use client";

import { usePathname } from "next/navigation";
import { useApp } from "@/components/app-provider";
import NotificationList from "@/components/notifications/NotificationList";
import { PAGE_META, PROFILE } from "@/lib/data";
import { Bell, Menu, Trophy } from "lucide-react";

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

  return (
    <header className="topbar">
      <div className="top-left">
        <button className="menu-btn" onClick={onMenu} aria-label="Toggle menu">
          <Menu size={20} aria-hidden="true" />
        </button>
        <div className="greeting">
          <h1>{meta.title}</h1>
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
          {periods.length === 0 && <option value="">Memuat spreadsheet…</option>}
          {periods.map((p) => (
            <option key={p.key} value={p.key}>
              {p.label}
            </option>
          ))}
        </select>
        <button className="pill button" onClick={openNotifications} aria-label="Notifications">
          <Bell size={16} aria-hidden="true" /> <span>{notifCount}</span>
        </button>
        <div className="pill level-pill">
          {topBa ? (
            <>
              <Trophy size={14} aria-hidden="true" /> <b>LV. {topBa.level}</b>
              <br />
              {topBa.levelName}
            </>
          ) : (
            <>
              <b>LV. {PROFILE.level}</b>
              <br />
              {PROFILE.title}
            </>
          )}
        </div>
      </div>
    </header>
  );
}
