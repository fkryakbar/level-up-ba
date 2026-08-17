import Icon from "@/components/ui/Icon";

export default function KpiCard({
  icon,
  label,
  value,
  footer,
  tone = "delta",
}: {
  icon?: string;
  label: string;
  value: string | number;
  footer: string;
  tone?: "delta" | "danger" | "warning";
}) {
  return (
    <div className="card kpi">
      <div className="label">
        {icon && <Icon name={icon} size={16} className="kpi-icon" />}
        {label}
      </div>
      <div className="value">{value}</div>
      <div className={tone}>{footer}</div>
    </div>
  );
}