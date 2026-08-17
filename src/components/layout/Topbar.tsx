"use client";

import { usePathname } from "next/navigation";
import { useApp } from "@/components/app-provider";
import NotificationList from "@/components/notifications/NotificationList";
import { PAGE_META, PERIODS, PROFILE } from "@/lib/data";
import type { PeriodKey } from "@/lib/types";

export default function Topbar({ onMenu }: { onMenu: () => void }) {
  const pathname = usePathname();
  const { period, setPeriod, notifCount, setNotifCount, showToast, openModal } = useApp();
  const meta = PAGE_META[pathname] ?? PAGE_META["/"];

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
          ☰
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
          onChange={(e) => {
            const value = e.target.value as PeriodKey;
            setPeriod(value);
            showToast(
              `Dashboard switched to ${e.target.options[e.target.selectedIndex].text}.`
            );
          }}
        >
          {PERIODS.map((p) => (
            <option key={p.key} value={p.key}>
              {p.label}
            </option>
          ))}
        </select>
        <button className="pill button" onClick={openNotifications} aria-label="Notifications">
          🔔 <span>{notifCount}</span>
        </button>
        <div className="pill level-pill">
          🛡️ <b>LV. {PROFILE.level}</b>
          <br />
          {PROFILE.title}
        </div>
      </div>
    </header>
  );
}