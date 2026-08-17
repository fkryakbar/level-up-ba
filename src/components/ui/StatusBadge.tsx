import type { Qualification } from "@/lib/types";

export default function StatusBadge({ status }: { status: Qualification }) {
  if (status === "good_perform") return <span className="badge-status status-good">Good Perform</span>;
  if (status === "perform") return <span className="badge-status status-info">Perform</span>;
  if (status === "underperform") return <span className="badge-status status-bad">Underperform</span>;
  return <span className="badge-status status-warn">Data belum lengkap</span>;
}
