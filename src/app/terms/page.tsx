import PageHeader from "@/components/ui/PageHeader";

export default function TermsPage() {
  return (
    <div className="page">
      <PageHeader title="Terms of service" subtitle="The rules that keep the Level Up BA program fair." />
      <div className="card panel" style={{ maxWidth: 820 }}>
        <div style={{ display: "grid", gap: 14, fontSize: 13, lineHeight: 1.7, color: "#c3d2e5" }}>
          <div>
            <h3 style={{ marginBottom: 4 }}>Program participation</h3>
            <p style={{ margin: 0 }}>
              Participation in the Level Up BA gamification program is managed by your organization. XP, rewards,
              and rankings reflect verified performance data.
            </p>
          </div>
          <div>
            <h3 style={{ marginBottom: 4 }}>Rewards</h3>
            <p style={{ margin: 0 }}>
              Reward redemptions are subject to availability and organization approval. Redemption requests are
              reviewed before fulfillment.
            </p>
          </div>
          <div>
            <h3 style={{ marginBottom: 4 }}>Acceptable use</h3>
            <p style={{ margin: 0 }}>
              Users are expected to report accurate information and not manipulate metrics. Abuse may result in
              score adjustments or removal from the program.
            </p>
          </div>
          <div>
            <h3 style={{ marginBottom: 4 }}>Contact</h3>
            <p style={{ margin: 0 }}>Questions about these terms can be directed to support@levelupba.id.</p>
          </div>
        </div>
      </div>
    </div>
  );
}