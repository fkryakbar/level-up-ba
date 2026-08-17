import Icon from "@/components/ui/Icon";
import { notifications } from "@/lib/data";

export default function NotificationList() {
  return (
    <div className="notification-list">
      {notifications.map((n) => (
        <div className={`notification-item${n.unread ? " unread" : ""}`} key={n.title}>
          <div className="notification-icon">
            <Icon name={n.icon} size={16} />
          </div>
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