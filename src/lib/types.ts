export type PeriodKey = "week1" | "week2" | "july4";

export interface PeriodData {
  total: number;
  review: number;
  x2c: number;
  sellout: number;
  perform: number;
  under: number;
  labels: string[];
  x2cSeries: number[];
  selloutSeries: number[];
  reviewSeries: number[];
}

export interface BaRecord {
  name: string;
  avatar: string;
  xp: number;
  sellout: number;
  x2c: number;
  review: number;
  streak: number;
  status: "perform" | "under";
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
}

export interface PageMeta {
  title: string;
  subtitle: string;
}