export type PeriodKey = string;

export type Qualification = "underperform" | "perform" | "good_perform" | "unknown";

export interface PeriodData {
  total: number;
  review: number;
  x2c: number;
  sellout: number;
  perform: number;
  under: number;
  goodPerform?: number;
  unknown?: number;
  totalReview?: number;
  totalX2c?: number;
  totalSellout?: number;
  labels: string[];
  x2cSeries: number[];
  selloutSeries: number[];
  reviewSeries: number[];
}

export interface BaRecord {
  name: string;
  avatar: string;
  xp: number;
  sellout: number | null;
  x2c: number | null;
  review: number | null;
  streak: number;
  status: Qualification;
}

export interface PerformanceBaRecord extends BaRecord {
  weeklyXp: number;
  hasData: boolean;
  x2cChange: number | null;
  x2cImprovement: number | null;
  level: number;
  levelName: string;
}

export interface Mission {
  icon: string;
  title: string;
  desc: string;
  current: number;
  target: number;
  unit: string;
  reward: number;
}

export interface Achievement {
  icon: string;
  title: string;
  owner: string;
  desc: string;
  time: string;
}

export interface Reward {
  icon: string;
  title: string;
  desc: string;
  cost: number;
  stock: number;
}

export interface HistoryItem {
  type: "xp" | "mission" | "reward";
  icon: string;
  title: string;
  text: string;
  time: string;
}

export interface Notification {
  icon: string;
  title: string;
  text: string;
  unread: boolean;
}

export interface Level {
  icon: string;
  num: string;
  name: string;
  reached: boolean;
}

export interface PeriodOption {
  key: PeriodKey;
  label: string;
  month?: string;
  week?: number;
}

export interface PerformanceSnapshot {
  period: PeriodOption;
  data: PeriodData;
  baData: PerformanceBaRecord[];
  achievements: Achievement[];
}

export interface PerformanceDataset {
  periods: PeriodOption[];
  defaultPeriod: PeriodKey;
  snapshots: Record<PeriodKey, PerformanceSnapshot>;
  updatedAt: string;
}

export interface PageMeta {
  title: string;
  subtitle: string;
}
