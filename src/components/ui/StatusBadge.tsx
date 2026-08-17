export default function StatusBadge({ status }: { status: "perform" | "under" }) {
  return status === "perform" ? (
    <span className="badge-status status-good">Perform</span>
  ) : (
    <span className="badge-status status-bad">Underperform</span>
  );
}