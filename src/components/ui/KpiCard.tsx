export default function KpiCard({
  label,
  value,
  footer,
  tone = "delta",
}: {
  label: string;
  value: string | number;
  footer: string;
  tone?: "delta" | "danger" | "warning";
}) {
  return (
    <div className="card kpi">
      <div className="label">{label}</div>
      <div className="value">{value}</div>
      <div className={tone}>{footer}</div>
    </div>
  );
}