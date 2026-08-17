import PageHeader from "@/components/ui/PageHeader";

export default function PrivacyPage() {
  return (
    <div className="page">
      <PageHeader title="Privacy policy" subtitle="How Level Up BA handles performance and personal data." />
      <div className="card panel" style={{ maxWidth: 820 }}>
        <div style={{ display: "grid", gap: 14, fontSize: 13, lineHeight: 1.7, color: "#c3d2e5" }}>
          <div>
            <h3 style={{ marginBottom: 4 }}>Data we collect</h3>
            <p style={{ margin: 0 }}>
              Level Up BA stores profile information for trainers and brand ambassadors, including name, role,
              email, and performance metrics such as XP, sellout, X2C, and review ratings.
            </p>
          </div>
          <div>
            <h3 style={{ marginBottom: 4 }}>How we use it</h3>
            <p style={{ margin: 0 }}>
              Data is used solely to run the gamification program: ranking, rewards, coaching priorities, and
              weekly performance reporting within your organization.
            </p>
          </div>
          <div>
            <h3 style={{ marginBottom: 4 }}>Retention and sharing</h3>
            <p style={{ margin: 0 }}>
              Records are retained for the active program period plus a reasonable review window. We do not sell
              personal data to third parties.
            </p>
          </div>
          <div>
            <h3 style={{ marginBottom: 4 }}>Contact</h3>
            <p style={{ margin: 0 }}>Questions about this policy can be directed to privacy@levelupba.id.</p>
          </div>
        </div>
      </div>
    </div>
  );
}