import { notifications } from "@/lib/data";

export default function NotificationList() {
  return (
    <div className="notification-list">
      {notifications.map((n) => (
        <div className={`notification-item${n.unread ? " unread" : ""}`} key={n.title}>
          <div className="notification-icon">{n.icon}</div>
          <div>
            <b>{n.title}</b>
            <p>{n.text}</p>
          </div>
          {n.unread && <span className="badge-status status-info">New</span>}
        </div>
      ))}
    </div>
  );
}