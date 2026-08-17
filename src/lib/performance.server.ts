import { google } from "googleapis";
import type {
  Achievement,
  PerformanceBaRecord,
  PerformanceDataset,
  PerformanceSnapshot,
  PeriodData,
  PeriodOption,
  Qualification,
} from "@/lib/types";

const MONTHS = [
  "JANUARI",
  "FEBRUARI",
  "MARET",
  "APRIL",
  "MEI",
  "JUNI",
  "JULI",
  "AGUSTUS",
  "SEPTEMBER",
  "OKTOBER",
  "NOVEMBER",
  "DESEMBER",
] as const;

const XP_BY_QUALIFICATION: Record<Exclude<Qualification, "unknown">, number> = {
  underperform: 10,
  perform: 100,
  good_perform: 50,
};

interface RawEntry {
  name: string;
  review: number | null;
  x2c: number | null;
  sellout: number | null;
  qualification: Qualification;
  hasData: boolean;
}

interface ParsedPeriod {
  period: PeriodOption;
  entries: RawEntry[];
  monthIndex: number;
}

interface BaState {
  xp: number;
  streak: number;
  previousWeeklyXp: number | null;
  lastX2c: number | null;
  baselineX2c: number | null;
}

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  return value;
}

function cleanText(value: string | undefined): string {
  return value?.trim() ?? "";
}

function normalizeText(value: string | undefined): string {
  return cleanText(value).replace(/\s+/g, " ").toUpperCase();
}

function parseNumber(value: string | undefined): number | null {
  const raw = cleanText(value);
  if (!raw || raw === "-") return null;

  const withoutSymbols = raw.replace(/[^0-9,.-]/g, "");
  if (!withoutSymbols || withoutSymbols === "-") return null;

  const normalized = withoutSymbols.includes(",")
    ? withoutSymbols.replace(/\./g, "").replace(",", ".")
    : withoutSymbols;
  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : null;
}

function parseQualification(value: string | undefined): Qualification {
  const normalized = normalizeText(value);
  if (normalized === "GOOD PERFORM") return "good_perform";
  if (normalized === "PERFORM") return "perform";
  if (normalized === "UNDERPERFORM") return "underperform";
  return "unknown";
}

function monthLabel(month: string): string {
  return `${month.slice(0, 1)}${month.slice(1).toLowerCase()}`;
}

function initials(name: string): string {
  const words = name.split(/\s+/).filter(Boolean);
  if (words.length === 0) return "?";
  if (words.length === 1) return words[0].slice(0, 1);
  return `${words[0].slice(0, 1)}${words.at(-1)?.slice(0, 1) ?? ""}`;
}

function average(values: Array<number | null>): number {
  const valid = values.filter((value): value is number => value !== null);
  if (valid.length === 0) return 0;
  return valid.reduce((total, value) => total + value, 0) / valid.length;
}

function total(values: Array<number | null>): number {
  return values.reduce<number>((sum, value) => sum + (value ?? 0), 0);
}

function findMetricIndex(
  metricRow: string[],
  start: number,
  end: number,
  matcher: (value: string) => boolean
): number | null {
  for (let index = start; index < end; index += 1) {
    if (matcher(normalizeText(metricRow[index]))) return index;
  }
  return null;
}

function parseMonthSheet(month: string, values: string[][]): ParsedPeriod[] {
  const weekRow = values[1] ?? [];
  const metricRow = values[2] ?? [];
  const columnCount = Math.max(
    weekRow.length,
    metricRow.length,
    ...values.slice(3).map((row) => row.length)
  );
  const starts = weekRow
    .map((value, index) => ({ value: normalizeText(value), index }))
    .filter(({ value }) => /^WEEK\s+\d+$/.test(value));
  const monthIndex = MONTHS.indexOf(month as (typeof MONTHS)[number]);

  return starts.flatMap(({ value, index }, groupIndex) => {
    const week = Number(value.match(/\d+/)?.[0]);
    if (!Number.isFinite(week)) return [];

    const end = starts[groupIndex + 1]?.index ?? columnCount;
    const reviewIndex = findMetricIndex(metricRow, index, end, (metric) => metric === "RATING REVIEW");
    const x2cIndex = findMetricIndex(metricRow, index, end, (metric) => metric === "X2C");
    const selloutIndex = findMetricIndex(
      metricRow,
      index,
      end,
      (metric) => metric === "SELLOUT" || metric === "SO"
    );
    const qualificationIndex = findMetricIndex(
      metricRow,
      index,
      end,
      (metric) => metric === "QUALIFICATION"
    );

    if (reviewIndex === null || x2cIndex === null || selloutIndex === null || qualificationIndex === null) {
      return [];
    }

    const period: PeriodOption = {
      key: `${month.toLowerCase()}-week-${week}`,
      label: `Week ${week} — ${monthLabel(month)}`,
      month,
      week,
    };
    const entries = values.slice(3).flatMap((row) => {
      const name = normalizeText(row[1]);
      if (!name) return [];

      const review = parseNumber(row[reviewIndex]);
      const x2c = parseNumber(row[x2cIndex]);
      const sellout = parseNumber(row[selloutIndex]);
      const hasData = [review, x2c, sellout].some((metric) => metric !== null);

      return [
        {
          name,
          review,
          x2c,
          sellout,
          qualification: hasData ? parseQualification(row[qualificationIndex]) : "unknown",
          hasData,
        },
      ];
    });

    return [{ period, entries, monthIndex }];
  });
}

function levelForXp(xp: number): { level: number; levelName: string } {
  if (xp >= 1000) return { level: 5, levelName: "Legend" };
  if (xp >= 700) return { level: 4, levelName: "Superstar" };
  if (xp >= 400) return { level: 3, levelName: "Performer" };
  if (xp >= 200) return { level: 2, levelName: "Rising Star" };
  return { level: 1, levelName: "Rookie" };
}

function buildPeriodData(selected: ParsedPeriod, monthHistory: ParsedPeriod[]): PeriodData {
  const activeEntries = selected.entries.filter((entry) => entry.hasData);
  const goodPerform = activeEntries.filter((entry) => entry.qualification === "good_perform").length;
  const standardPerform = activeEntries.filter((entry) => entry.qualification === "perform").length;
  const under = activeEntries.filter((entry) => entry.qualification === "underperform").length;

  return {
    total: selected.entries.length,
    review: average(activeEntries.map((entry) => entry.review)),
    x2c: average(activeEntries.map((entry) => entry.x2c)),
    sellout: average(activeEntries.map((entry) => entry.sellout)),
    perform: goodPerform + standardPerform,
    under,
    goodPerform,
    unknown: selected.entries.length - activeEntries.length,
    totalReview: total(activeEntries.map((entry) => entry.review)),
    totalX2c: total(activeEntries.map((entry) => entry.x2c)),
    totalSellout: total(activeEntries.map((entry) => entry.sellout)),
    labels: monthHistory.map((item) => `Week ${item.period.week}`),
    x2cSeries: monthHistory.map((item) => average(item.entries.filter((entry) => entry.hasData).map((entry) => entry.x2c))),
    selloutSeries: monthHistory.map((item) => average(item.entries.filter((entry) => entry.hasData).map((entry) => entry.sellout))),
    reviewSeries: monthHistory.map((item) => average(item.entries.filter((entry) => entry.hasData).map((entry) => entry.review))),
  };
}

function buildAchievements(records: PerformanceBaRecord[], periodLabel: string): Achievement[] {
  const achievements: Achievement[] = [];
  const targetHunter = records
    .filter((record) => record.hasData && record.status !== "underperform" && record.status !== "unknown")
    .sort((a, b) => (b.x2c ?? 0) - (a.x2c ?? 0))[0];
  if (targetHunter) {
    achievements.push({
      icon: "target",
      title: "Target Hunter",
      owner: targetHunter.name,
      desc: `${targetHunter.status === "good_perform" ? "Good Perform" : "Perform"} pada ${periodLabel}.`,
      time: periodLabel,
    });
  }

  const conversionMaster = records
    .filter((record) => record.x2cChange !== null)
    .sort((a, b) => (b.x2cChange ?? 0) - (a.x2cChange ?? 0))[0];
  if (conversionMaster && (conversionMaster.x2cChange ?? 0) > 0) {
    achievements.push({
      icon: "trending-up",
      title: "Conversion Master",
      owner: conversionMaster.name,
      desc: `X2C naik ${conversionMaster.x2cChange} dari minggu valid sebelumnya.`,
      time: periodLabel,
    });
  }

  const consistency = records.filter((record) => record.streak >= 4).sort((a, b) => b.streak - a.streak)[0];
  if (consistency) {
    achievements.push({
      icon: "flame",
      title: "Consistency King/Queen",
      owner: consistency.name,
      desc: `Menjaga streak XP ${consistency.streak} minggu.`,
      time: periodLabel,
    });
  }

  const mostImproved = records
    .filter((record) => record.x2cImprovement !== null)
    .sort((a, b) => (b.x2cImprovement ?? 0) - (a.x2cImprovement ?? 0))[0];
  if (mostImproved && (mostImproved.x2cImprovement ?? 0) > 0) {
    achievements.push({
      icon: "rocket",
      title: "Most Improved",
      owner: mostImproved.name,
      desc: `X2C meningkat ${mostImproved.x2cImprovement} dari baseline minggu valid pertama.`,
      time: periodLabel,
    });
  }

  return achievements;
}

function buildDataset(parsedPeriods: ParsedPeriod[]): PerformanceDataset {
  const periods = parsedPeriods.map(({ period }) => period);
  const states = new Map<string, BaState>();
  const snapshots: PerformanceDataset["snapshots"] = {};

  for (let index = 0; index < parsedPeriods.length; index += 1) {
    const parsed = parsedPeriods[index];
    const records = parsed.entries.map<PerformanceBaRecord>((entry) => {
      const state = states.get(entry.name) ?? {
        xp: 0,
        streak: 0,
        previousWeeklyXp: null,
        lastX2c: null,
        baselineX2c: null,
      };
      const weeklyXp = entry.hasData && entry.qualification !== "unknown"
        ? XP_BY_QUALIFICATION[entry.qualification]
        : 0;
      let x2cChange: number | null = null;
      let x2cImprovement: number | null = null;

      if (entry.x2c !== null) {
        x2cChange = state.lastX2c === null ? null : entry.x2c - state.lastX2c;
        state.baselineX2c ??= entry.x2c;
        x2cImprovement = entry.x2c - state.baselineX2c;
        state.lastX2c = entry.x2c;
      }

      if (weeklyXp > 0) {
        state.xp += weeklyXp;
        state.streak =
          state.previousWeeklyXp === null || weeklyXp >= state.previousWeeklyXp
            ? state.streak + 1
            : 1;
        state.previousWeeklyXp = weeklyXp;
      }

      states.set(entry.name, state);
      const level = levelForXp(state.xp);
      return {
        name: entry.name,
        avatar: initials(entry.name),
        xp: state.xp,
        sellout: entry.sellout,
        x2c: entry.x2c,
        review: entry.review,
        streak: state.streak,
        status: entry.qualification,
        weeklyXp,
        hasData: entry.hasData,
        x2cChange,
        x2cImprovement,
        level: level.level,
        levelName: level.levelName,
      };
    });

    const sameMonthHistory = parsedPeriods.filter(
      (candidate, candidateIndex) =>
        candidate.period.month === parsed.period.month && candidateIndex <= index
    );
    const snapshot: PerformanceSnapshot = {
      period: parsed.period,
      data: buildPeriodData(parsed, sameMonthHistory),
      baData: records.sort((a, b) => b.xp - a.xp || a.name.localeCompare(b.name)),
      achievements: buildAchievements(records, parsed.period.label),
    };
    snapshots[parsed.period.key] = snapshot;
  }

  const defaultPeriod = periods.at(-1)?.key;
  if (!defaultPeriod) throw new Error("No supported weekly performance data was found in the spreadsheet.");

  return {
    periods,
    defaultPeriod,
    snapshots,
    updatedAt: new Date().toISOString(),
  };
}

export async function getPerformanceDataset(): Promise<PerformanceDataset> {
  const spreadsheetId = requireEnv("GOOGLE_SHEETS_SPREADSHEET_ID");
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: requireEnv("GOOGLE_SERVICE_ACCOUNT_EMAIL"),
      private_key: requireEnv("GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY").replace(/\\n/g, "\n"),
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  });
  const sheets = google.sheets({ version: "v4", auth });
  const metadata = await sheets.spreadsheets.get({
    spreadsheetId,
    fields: "sheets(properties(title,index,gridProperties(columnCount)))",
  });
  const sourceSheets = (metadata.data.sheets ?? [])
    .flatMap((sheet) => {
      const title = sheet.properties?.title;
      if (!title) return [];
      return [{ title, columnCount: sheet.properties?.gridProperties?.columnCount ?? 0 }];
    })
    .filter((properties) => MONTHS.includes(normalizeText(properties.title) as (typeof MONTHS)[number]))
    .filter(
      (properties) =>
        !(normalizeText(properties.title) === "APRIL" && properties.columnCount > 30)
    )
    .sort(
      (a, b) =>
        MONTHS.indexOf(normalizeText(a.title) as (typeof MONTHS)[number]) -
        MONTHS.indexOf(normalizeText(b.title) as (typeof MONTHS)[number])
    );

  const ranges = sourceSheets.map((sheet) => `'${sheet.title}'!A1:Z100`);
  if (ranges.length === 0) throw new Error("No monthly source tabs were found in the spreadsheet.");

  const response = await sheets.spreadsheets.values.batchGet({
    spreadsheetId,
    ranges,
    valueRenderOption: "FORMATTED_VALUE",
  });
  const parsed = sourceSheets.flatMap((sheet, index) =>
    parseMonthSheet(normalizeText(sheet.title), (response.data.valueRanges?.[index]?.values as string[][] | undefined) ?? [])
  );

  return buildDataset(
    parsed.sort((a, b) => a.monthIndex - b.monthIndex || (a.period.week ?? 0) - (b.period.week ?? 0))
  );
}
