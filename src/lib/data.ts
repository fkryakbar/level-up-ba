import type {
  Achievement,
  BaRecord,
  HistoryItem,
  Level,
  Mission,
  Notification,
  PageMeta,
  PeriodData,
  PeriodKey,
  PeriodOption,
  Reward,
} from "./types";

export const PERIODS: PeriodOption[] = [
  { key: "week1", label: "Week 1 — Agustus 2026" },
  { key: "week2", label: "Week 2 — Agustus 2026" },
  { key: "july4", label: "Week 4 — Juli 2026" },
];

export const datasets: Record<PeriodKey, PeriodData> = {
  week1: {
    total: 40,
    review: 11.2,
    x2c: 78.6,
    sellout: 18.2,
    perform: 6,
    under: 31,
    labels: ["02 Aug", "03 Aug", "04 Aug", "05 Aug", "06 Aug", "07 Aug", "08 Aug"],
    x2cSeries: [64, 82, 104, 87, 112, 143, 99],
    selloutSeries: [18, 21, 27, 23, 29, 38, 26],
    reviewSeries: [8, 9, 11, 10, 12, 15, 11],
  },
  week2: {
    total: 40,
    review: 12.8,
    x2c: 85.4,
    sellout: 20.1,
    perform: 9,
    under: 25,
    labels: ["09 Aug", "10 Aug", "11 Aug", "12 Aug", "13 Aug", "14 Aug", "15 Aug"],
    x2cSeries: [75, 91, 88, 102, 116, 120, 106],
    selloutSeries: [21, 25, 22, 27, 31, 33, 29],
    reviewSeries: [10, 12, 11, 14, 13, 16, 14],
  },
  july4: {
    total: 39,
    review: 10.6,
    x2c: 72.5,
    sellout: 16.7,
    perform: 5,
    under: 30,
    labels: ["26 Jul", "27 Jul", "28 Jul", "29 Jul", "30 Jul", "31 Jul", "01 Aug"],
    x2cSeries: [55, 63, 74, 69, 83, 92, 71],
    selloutSeries: [14, 16, 18, 17, 20, 22, 19],
    reviewSeries: [7, 8, 10, 9, 11, 12, 9],
  },
};

export const baData: BaRecord[] = [
  { name: "Pahriah", avatar: "👩🏻", xp: 1420, sellout: 38, x2c: 114, review: 18, streak: 5, status: "perform" },
  { name: "Saudah", avatar: "👩🏽", xp: 1180, sellout: 33, x2c: 108, review: 16, streak: 4, status: "perform" },
  { name: "Maulida", avatar: "👩🏽", xp: 1050, sellout: 31, x2c: 105, review: 15, streak: 4, status: "perform" },
  { name: "Norcahyanti", avatar: "👩🏽", xp: 980, sellout: 27, x2c: 96, review: 14, streak: 3, status: "perform" },
  { name: "Alya", avatar: "👩🏻", xp: 850, sellout: 24, x2c: 91, review: 13, streak: 2, status: "perform" },
  { name: "Nor Allinda", avatar: "👩🏻", xp: 620, sellout: 21, x2c: 84, review: 12, streak: 2, status: "perform" },
  { name: "Revalina Bahri", avatar: "👩🏽", xp: 600, sellout: 18, x2c: 79, review: 11, streak: 1, status: "under" },
  { name: "Sari Purnama", avatar: "👩🏻", xp: 580, sellout: 17, x2c: 76, review: 10, streak: 1, status: "under" },
  { name: "Rahma", avatar: "👩🏽", xp: 540, sellout: 16, x2c: 72, review: 10, streak: 1, status: "under" },
  { name: "Nadia", avatar: "👩🏻", xp: 515, sellout: 15, x2c: 68, review: 9, streak: 0, status: "under" },
  { name: "Fitri", avatar: "👩🏽", xp: 485, sellout: 14, x2c: 66, review: 9, streak: 0, status: "under" },
  { name: "Laila", avatar: "👩🏻", xp: 450, sellout: 12, x2c: 61, review: 8, streak: 0, status: "under" },
];

export const missions: Mission[] = [
  { icon: "target", title: "Conversion Hunter", desc: "Achieve X2C ≥ 80 this week", current: 78, target: 80, unit: "", reward: 100 },
  { icon: "star", title: "Review Booster", desc: "Achieve Rating Review ≥ 15", current: 11, target: 15, unit: "", reward: 80 },
  { icon: "shopping-bag", title: "Sales Booster", desc: "Achieve Sellout ≥ 20%", current: 18, target: 20, unit: "%", reward: 100 },
  { icon: "flame", title: "Consistency Streak", desc: "Hit all minimum metrics for 3 consecutive days", current: 2, target: 3, unit: " days", reward: 120 },
  { icon: "rocket", title: "Growth Sprint", desc: "Improve overall score by at least 10%", current: 7, target: 10, unit: "%", reward: 100 },
  { icon: "handshake", title: "Team Player", desc: "Complete 5 coaching check-ins", current: 3, target: 5, unit: "", reward: 60 },
];

export const achievements: Achievement[] = [
  { icon: "trophy", title: "Top Performer", owner: "Pahriah", desc: "Achieved Sellout 38% this week", time: "2h ago" },
  { icon: "flame", title: "Consistency King", owner: "Saudah", desc: "Consistent performance for 2 weeks", time: "4h ago" },
  { icon: "target", title: "X2C Master", owner: "Maulida", desc: "Achieved X2C 105 this week", time: "6h ago" },
  { icon: "rocket", title: "Improvement Star", owner: "Norcahyanti", desc: "Improvement +10% from last week", time: "1d ago" },
  { icon: "star", title: "Review Champion", owner: "Alya", desc: "Maintained strong customer review output", time: "2d ago" },
  { icon: "handshake", title: "Team Supporter", owner: "Nor Allinda", desc: "Completed all coaching check-ins", time: "3d ago" },
];

export const rewards: Reward[] = [
  { icon: "coffee", title: "Coffee Voucher", desc: "Redeem a beverage voucher from selected merchants.", cost: 300, stock: 12 },
  { icon: "utensils", title: "Meal Voucher", desc: "Lunch voucher for high-performing BA.", cost: 500, stock: 8 },
  { icon: "ticket", title: "Entertainment Ticket", desc: "Movie or recreation voucher.", cost: 700, stock: 4 },
  { icon: "shopping-bag", title: "Shopping Voucher", desc: "Shopping voucher worth Rp100.000.", cost: 900, stock: 5 },
  { icon: "gift", title: "Mystery Box", desc: "Random merchandise and surprise rewards.", cost: 1000, stock: 3 },
  { icon: "sun", title: "Extra Day Off", desc: "One additional approved leave day.", cost: 1800, stock: 2 },
];

export const historyItems: HistoryItem[] = [
  { type: "xp", icon: "sparkles", title: "Pahriah earned +100 XP", text: "Completed Sales Booster mission.", time: "Today, 13:20" },
  { type: "mission", icon: "target", title: "Conversion Hunter reached 97%", text: "Team X2C progress is now 78/80.", time: "Today, 11:40" },
  { type: "reward", icon: "gift", title: "Saudah redeemed Coffee Voucher", text: "300 XP deducted from reward balance.", time: "Today, 09:15" },
  { type: "xp", icon: "flame", title: "Maulida received +50 XP", text: "Weekly consistency bonus.", time: "Yesterday, 16:30" },
  { type: "mission", icon: "star", title: "Review Booster updated", text: "Current progress 11/15.", time: "Yesterday, 14:10" },
  { type: "reward", icon: "utensils", title: "Norcahyanti redeemed Meal Voucher", text: "500 XP redeemed successfully.", time: "12 Aug 2026" },
];

export const notifications: Notification[] = [
  { icon: "alert", title: "31 BA need attention", text: "Underperform rate is currently 77.5%.", unread: true },
  { icon: "target", title: "Mission almost complete", text: "Conversion Hunter is at 97%.", unread: true },
  { icon: "trophy", title: "New top performer", text: "Pahriah reached 1,420 XP.", unread: true },
  { icon: "calendar", title: "Weekly review scheduled", text: "Performance review is due Monday.", unread: false },
];

export const LEVELS: Level[] = [
  { icon: "sprout", num: "Lv.1", name: "Rookie", reached: true },
  { icon: "zap", num: "Lv.2", name: "Rising Star", reached: true },
  { icon: "star", num: "Lv.3", name: "Performer", reached: true },
  { icon: "shield", num: "Lv.4", name: "Superstar", reached: true },
  { icon: "crown", num: "Lv.5", name: "Legend", reached: false },
];

export const PAGE_META: Record<string, PageMeta> = {
  "/": { title: "Good afternoon, Hanna", subtitle: "Keep the momentum and level up your team performance" },
  "/achievements": { title: "Achievements", subtitle: "Celebrate milestones and recognize outstanding performance." },
  "/missions": { title: "Missions", subtitle: "Focus the team on clear weekly performance targets." },
  "/rewards": { title: "Rewards Store", subtitle: "Turn performance and consistency into meaningful rewards." },
  "/leaderboard": { title: "Leaderboard", subtitle: "See where every Brand Ambassador stands this week." },
  "/history": { title: "History", subtitle: "Review gamification and performance activity." },
  "/analytics": { title: "Analytics", subtitle: "Turn performance data into coaching priorities." },
  "/settings": { title: "Settings", subtitle: "Configure the Level Up BA experience." },
  "/privacy": { title: "Privacy policy", subtitle: "How Level Up BA handles your data." },
  "/terms": { title: "Terms of service", subtitle: "The rules that keep the program fair." },
};

export const PROFILE = {
  name: "Hanna",
  role: "Trainer",
  email: "hanna@levelupba.id",
  level: 4,
  title: "Superstar",
  xp: "1,250 / 1,800 XP",
  xpProgress: 69,
  balance: 1250,
};

export const AWARD_OPTIONS = [
  "Top Performer",
  "Consistency King",
  "X2C Master",
  "Improvement Star",
];

export const TIMEZONES = [
  "Asia/Makassar (UTC+8)",
  "Asia/Jakarta (UTC+7)",
  "Asia/Jayapura (UTC+9)",
];