"use client";

import { useRef, useState } from "react";
import type { PeriodData } from "@/lib/types";

interface Point {
  x: number;
  y: number;
}

interface SeriesPoint extends Point {
  v: number;
}

interface SeriesDef {
  key: string;
  points: SeriesPoint[];
  color: string;
  dash?: string;
  name: string;
  values: number[];
  suffix: string;
}

interface TooltipState {
  x: number;
  y: number;
  series: string;
  label: string;
  value: string;
}

const VIEW_W = 760;
const VIEW_H = 260;
const X_START = 50;
const X_END = 710;
const Y_TOP = 25;
const Y_BOTTOM = 213;
const MAX_VALUE = 150;

function scale(values: number[], max: number): SeriesPoint[] {
  return values.map((v, i) => {
    const x = X_START + (i * (X_END - X_START)) / (values.length - 1);
    const y = Y_BOTTOM - (v / max) * (Y_BOTTOM - Y_TOP);
    return { x, y, v };
  });
}

export default function PerformanceChart({ data }: { data: PeriodData }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);

  const selloutScaled = data.selloutSeries.map((v) => v * 3.4);
  const reviewScaled = data.reviewSeries.map((v) => v * 5.2);

  const series: SeriesDef[] = [
    {
      key: "x2c",
      points: scale(data.x2cSeries, MAX_VALUE),
      color: "#35d7ce",
      name: "X2C",
      values: data.x2cSeries,
      suffix: "",
    },
    {
      key: "sellout",
      points: scale(selloutScaled, MAX_VALUE),
      color: "#ffd34d",
      name: "Sellout",
      values: data.selloutSeries,
      suffix: "%",
    },
    {
      key: "review",
      points: scale(reviewScaled, MAX_VALUE),
      color: "#a874ff",
      dash: "7 6",
      name: "Rating Review",
      values: data.reviewSeries,
      suffix: "",
    },
  ];

  const line = (points: SeriesPoint[]) =>
    points.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");

  const yGrid = [150, 120, 90, 60, 30];
  const yPos = [25, 72, 119, 166, 213];

  const showTooltip = (s: SeriesDef, idx: number) => {
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const point = s.points[idx];
    setTooltip({
      x: (point.x / VIEW_W) * rect.width,
      y: (point.y / VIEW_H) * rect.height,
      series: s.name,
      label: data.labels[idx],
      value: `${s.values[idx]}${s.suffix}`,
    });
  };

  return (
    <div className="chart-wrap">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        preserveAspectRatio="none"
        aria-label="Performance chart"
      >
        {yPos.map((y, i) => (
          <g key={y}>
            <line className="gridline" x1="50" y1={y} x2="735" y2={y} />
            <text className="axis" x={yGrid[i] >= 100 ? 12 : 24} y={y + 3}>
              {yGrid[i]}
            </text>
          </g>
        ))}

        {data.labels.map((label, i) => {
          const x = 50 + (i * 660) / (data.labels.length - 1);
          return (
            <text key={label} className="axis" x={x - 5} y="240">
              {label}
            </text>
          );
        })}

        {series.map((s) => (
          <polyline
            key={s.key}
            className="chartline"
            stroke={s.color}
            strokeDasharray={s.dash}
            points={line(s.points)}
          />
        ))}

        {series.map((s) =>
          s.points.map((p, idx) => (
            <circle
              key={`${s.key}-${idx}`}
              className="dot"
              fill={s.color}
              cx={p.x}
              cy={p.y}
              r={4}
              onMouseEnter={() => showTooltip(s, idx)}
              onMouseLeave={() => setTooltip(null)}
            />
          ))
        )}
      </svg>

      {tooltip && (
        <div className="chart-tooltip" style={{ left: tooltip.x, top: tooltip.y }}>
          <b>{tooltip.series}</b>
          <br />
          {tooltip.label}: {tooltip.value}
        </div>
      )}
    </div>
  );
}