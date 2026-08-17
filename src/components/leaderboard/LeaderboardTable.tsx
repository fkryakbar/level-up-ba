"use client";

import { useMemo, useState } from "react";
import { Flame, Search } from "lucide-react";
import { initials } from "@/lib/initials";
import { useApp } from "@/components/app-provider";
import StatusBadge from "@/components/ui/StatusBadge";

type Filter = "all" | "good" | "perform" | "under";
type SortKey = "xp" | "sellout" | "x2c" | "review";

const FILTERS: { key: Filter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "good", label: "Good Perform" },
  { key: "perform", label: "Perform" },
  { key: "under", label: "Underperform" },
];

const SORTABLE: { key: SortKey; label: string }[] = [
  { key: "xp", label: "XP ↕" },
  { key: "sellout", label: "Sellout ↕" },
  { key: "x2c", label: "X2C ↕" },
  { key: "review", label: "Review ↕" },
];

export default function LeaderboardTable() {
  const { showToast, snapshot, isPerformanceLoading, performanceError } = useApp();
  const [filter, setFilter] = useState<Filter>("all");
  const [term, setTerm] = useState("");
  const [sort, setSort] = useState<{ key: SortKey; dir: "asc" | "desc" }>({
    key: "xp",
    dir: "desc",
  });

  const rows = useMemo(() => {
    let data = [...(snapshot?.baData ?? [])];
    if (filter === "good") data = data.filter((x) => x.status === "good_perform");
    if (filter === "perform") data = data.filter((x) => x.status === "perform");
    if (filter === "under") data = data.filter((x) => x.status === "underperform");
    if (term) data = data.filter((x) => x.name.toLowerCase().includes(term.toLowerCase()));
    data.sort((a, b) => {
      const av = a[sort.key] ?? -Infinity;
      const bv = b[sort.key] ?? -Infinity;
      return sort.dir === "asc" ? av - bv : bv - av;
    });
    return data;
  }, [filter, snapshot?.baData, term, sort]);

  const toggleSort = (key: SortKey) => {
    setSort((prev) =>
      prev.key === key
        ? { key, dir: prev.dir === "asc" ? "desc" : "asc" }
        : { key, dir: "desc" }
    );
  };

  const exportCsv = () => {
    const header = ["Rank", "Name", "XP", "Sellout", "X2C", "Review", "Streak", "Status"];
    const csv = [header, ...rows.map((u, i) => [i + 1, u.name, u.xp, u.sellout, u.x2c, u.review, u.streak, u.status])]
      .map((row) => row.map((v) => `"${String(v).replaceAll('"', '""')}"`).join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "level-up-ba-leaderboard.csv";
    a.click();
    URL.revokeObjectURL(url);
    showToast("Leaderboard exported to CSV.");
  };

  if (isPerformanceLoading) {
    return <div className="card panel skeleton" aria-label="Memuat leaderboard"><div className="bar" /><div className="row" /></div>;
  }

  if (!snapshot) {
    return <div className="card panel empty-state"><span className="empty-icon">⚠️</span><b>Leaderboard belum tersedia</b>{performanceError}</div>;
  }

  return (
    <div className="card panel">
      <div className="toolbar">
        <input
          className="input"
          placeholder="Search BA..."
          style={{ maxWidth: 300 }}
          value={term}
          onChange={(e) => setTerm(e.target.value)}
        />
        <div className="toolbar-actions">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              className={`btn ${filter === f.key ? "primary" : ""}`}
              onClick={() => setFilter(f.key)}
            >
              {f.label}
            </button>
          ))}
          <button className="btn" onClick={exportCsv}>
            Export CSV
          </button>
        </div>
      </div>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Brand Ambassador</th>
              {SORTABLE.map((s) => (
                <th key={s.key} className="sortable" onClick={() => toggleSort(s.key)}>
                  {s.label}
                </th>
              ))}
              <th>Streak</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={8}>
                  <div className="empty-state">
                    <span className="empty-icon">
                      <Search size={30} />
                    </span>
                    <b>No BA match your filters</b>
                    Try clearing the search or switching to a different status.
                    <div style={{ marginTop: 14 }}>
                      <button
                        className="btn"
                        onClick={() => {
                          setTerm("");
                          setFilter("all");
                        }}
                      >
                        Reset filters
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            ) : (
              rows.map((user, index) => (
                <tr key={user.name}>
                  <td>
                    <b>{index + 1}</b>
                  </td>
                  <td>
                    <div className="usercell">
                      <span className="miniavatar">{initials(user.name)}</span>
                      <b>{user.name}</b>
                    </div>
                  </td>
                  <td style={{ color: "var(--accent)", fontWeight: 800 }}>
                    {user.xp.toLocaleString("id-ID")}
                  </td>
                  <td>{user.sellout === null ? "—" : `${user.sellout.toFixed(1).replace('.0', '')}%`}</td>
                  <td>{user.x2c !== null && user.x2c !== undefined ? user.x2c.toFixed(1).replace('.0', '') : "—"}</td>
                  <td>{user.review !== null && user.review !== undefined ? user.review.toFixed(1).replace('.0', '') : "—"}</td>
                  <td>
                    {user.streak ? (
                      <span className="streak-wrap">
                        {Array.from({ length: Math.min(user.streak, 3) }).map((_, i) => (
                          <span key={i} className="fire-icon">🔥</span>
                        ))}
                        <span className="streak-num">{user.streak}</span>
                      </span>
                    ) : (
                      "—"
                    )}
                  </td>
                  <td>
                    <StatusBadge status={user.status} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
