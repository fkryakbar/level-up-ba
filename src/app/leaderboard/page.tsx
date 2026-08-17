import PageHeader from "@/components/ui/PageHeader";
import LeaderboardTable from "@/components/leaderboard/LeaderboardTable";

export default function LeaderboardPage() {
  return (
    <div className="page">
      <PageHeader
        title="Leaderboard"
        subtitle="Ranking by XP, sellout, X2C, review performance, and streak."
      />
      <LeaderboardTable />
    </div>
  );
}