"use client";

import PageHeader from "@/components/ui/PageHeader";
import ToggleSwitch from "@/components/settings/ToggleSwitch";
import { useApp } from "@/components/app-provider";
import { TIMEZONES } from "@/lib/data";

export default function SettingsPage() {
  const { showToast } = useApp();

  return (
    <div className="page">
      <PageHeader
        title="Settings"
        subtitle="Configure profile, gamification rules, notifications, and dashboard behavior."
        action={
          <button className="btn primary" onClick={() => showToast("Settings saved.")}>
            Save Changes
          </button>
        }
      />

      <div className="settings-grid">
        <div className="card panel">
          <h2>PROFILE</h2>
          <div className="divider" />
          <div style={{ display: "grid", gap: 11 }}>
            <div className="input-group">
              <label>Name</label>
              <input className="input" defaultValue="Hanna" />
            </div>
            <div className="input-group">
              <label>Role</label>
              <input className="input" defaultValue="Trainer" />
            </div>
            <div className="input-group">
              <label>Email</label>
              <input className="input" defaultValue="hanna@levelupba.id" />
            </div>
            <div className="input-group">
              <label>Timezone</label>
              <select className="input">
                {TIMEZONES.map((tz) => (
                  <option key={tz}>{tz}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="card panel">
          <h2>NOTIFICATIONS</h2>
          <div className="divider" />
          <div className="setting-row">
            <div>
              <b>Mission reminder</b>
              <small>Notify when mission progress is near target.</small>
            </div>
            <ToggleSwitch defaultOn />
          </div>
          <div className="setting-row">
            <div>
              <b>Underperform alert</b>
              <small>Notify when BA drops below threshold.</small>
            </div>
            <ToggleSwitch defaultOn />
          </div>
          <div className="setting-row">
            <div>
              <b>Weekly report</b>
              <small>Send weekly performance summary.</small>
            </div>
            <ToggleSwitch defaultOn />
          </div>
          <div className="setting-row">
            <div>
              <b>Reward redemption</b>
              <small>Notify after reward redemption request.</small>
            </div>
            <ToggleSwitch />
          </div>
        </div>

        <div className="card panel">
          <h2>PERFORMANCE THRESHOLD</h2>
          <div className="divider" />
          <div style={{ display: "grid", gap: 11 }}>
            <div className="input-group">
              <label>Minimum X2C</label>
              <input className="input" type="number" defaultValue="80" />
            </div>
            <div className="input-group">
              <label>Minimum Sellout (%)</label>
              <input className="input" type="number" defaultValue="20" />
            </div>
            <div className="input-group">
              <label>Minimum Rating Review</label>
              <input className="input" type="number" defaultValue="15" />
            </div>
          </div>
        </div>

        <div className="card panel">
          <h2>XP RULES</h2>
          <div className="divider" />
          <div style={{ display: "grid", gap: 11 }}>
            <div className="input-group">
              <label>X2C Target Achieved</label>
              <input className="input" type="number" defaultValue="100" />
            </div>
            <div className="input-group">
              <label>Sellout Target Achieved</label>
              <input className="input" type="number" defaultValue="100" />
            </div>
            <div className="input-group">
              <label>Review Target Achieved</label>
              <input className="input" type="number" defaultValue="80" />
            </div>
            <div className="input-group">
              <label>Weekly Streak Bonus</label>
              <input className="input" type="number" defaultValue="50" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}