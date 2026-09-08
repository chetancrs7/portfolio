"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

type ContributionDay = {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
};

type ContributionWeek = {
  days: ContributionDay[];
};

type ContributionData = {
  weeks: ContributionWeek[];
  totalContributions: number;
};

const CELL_SIZE = 11;
const CELL_GAP = 3;
const STEP = CELL_SIZE + CELL_GAP;
const MONTH_LABEL_HEIGHT = 20;
const DAY_LABEL_WIDTH = 28;

const DAY_LABELS = ["Mon", "Wed", "Fri"] as const;
const DAY_LABEL_ROWS = [1, 3, 5] as const;

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const LEVEL_CLASSES = [
  "fill-[var(--contrib-0)]",
  "fill-[var(--contrib-1)]",
  "fill-[var(--contrib-2)]",
  "fill-[var(--contrib-3)]",
  "fill-[var(--contrib-4)]",
] as const;

function getMonthLabels(weeks: ContributionWeek[]) {
  const labels: { label: string; col: number }[] = [];
  let lastMonth = -1;

  for (let i = 0; i < weeks.length; i++) {
    const firstDay = weeks[i].days[0];
    if (!firstDay) continue;
    const month = new Date(firstDay.date + "T00:00:00").getMonth();
    if (month !== lastMonth) {
      labels.push({ label: MONTHS[month], col: i });
      lastMonth = month;
    }
  }

  return labels;
}

function Tooltip({
  day,
  x,
  y,
}: {
  day: ContributionDay;
  x: number;
  y: number;
}) {
  const date = new Date(day.date + "T00:00:00");
  const formatted = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div
      className="pointer-events-none absolute z-50 rounded-md border border-[var(--border)] bg-[var(--surface)] px-2.5 py-1.5 text-xs shadow-lg"
      style={{
        left: x,
        top: y - 40,
        transform: "translateX(-50%)",
      }}
    >
      <span className="text-foreground font-medium">
        {day.count} contribution{day.count !== 1 ? "s" : ""}
      </span>{" "}
      <span className="text-muted-foreground">on {formatted}</span>
    </div>
  );
}

export function GitHubContributions({
  className,
  username,
}: {
  className?: string;
  username: string;
}) {
  const [data, setData] = useState<ContributionData | null>(null);
  const [error, setError] = useState(false);
  const [tooltip, setTooltip] = useState<{
    day: ContributionDay;
    x: number;
    y: number;
  } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;

    fetch(`/api/github-contributions?username=${encodeURIComponent(username)}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((json) => {
        if (!cancelled) setData(json);
      })
      .catch(() => {
        if (!cancelled) setError(true);
      });

    return () => {
      cancelled = true;
    };
  }, [username]);

  if (error) return null;

  if (!data) {
    return (
      <div className={cn("animate-pulse", className)}>
        <div className="bg-muted/30 h-[140px] rounded-xl" />
      </div>
    );
  }

  const { weeks, totalContributions } = data;
  const monthLabels = getMonthLabels(weeks);
  const svgWidth = DAY_LABEL_WIDTH + weeks.length * STEP;
  const svgHeight = MONTH_LABEL_HEIGHT + 7 * STEP;

  function handleCellHover(
    day: ContributionDay,
    e: React.MouseEvent<SVGRectElement>,
  ) {
    const rect = e.currentTarget.getBoundingClientRect();
    const container = containerRef.current?.getBoundingClientRect();
    if (!container) return;
    setTooltip({
      day,
      x: rect.left + rect.width / 2 - container.left,
      y: rect.top - container.top,
    });
  }

  return (
    <div className={cn("relative", className)} ref={containerRef}>
      <div className="flex items-baseline justify-between gap-4 mb-4">
        <div className="flex items-center gap-3">
          <a
            className="type-mono text-muted-foreground hover:text-foreground text-xs transition-colors"
            href={`https://github.com/${username}`}
            rel="noopener noreferrer"
            target="_blank"
          >
            @{username}
          </a>
        </div>
        <p className="type-mono text-muted-foreground text-xs">
          {totalContributions.toLocaleString()} contributions in the last year
        </p>
      </div>

      <div
        className="overflow-x-auto"
        onMouseLeave={() => setTooltip(null)}
      >
        <svg
          className="block"
          height={svgHeight}
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          width={svgWidth}
        >
          {DAY_LABELS.map((label, i) => (
            <text
              className="fill-muted-foreground text-[10px]"
              dominantBaseline="central"
              key={label}
              x={0}
              y={MONTH_LABEL_HEIGHT + DAY_LABEL_ROWS[i] * STEP + CELL_SIZE / 2}
            >
              {label}
            </text>
          ))}

          {monthLabels.map(({ label, col }) => (
            <text
              className="fill-muted-foreground text-[10px]"
              key={`${label}-${col}`}
              x={DAY_LABEL_WIDTH + col * STEP}
              y={12}
            >
              {label}
            </text>
          ))}

          {weeks.map((week, weekIdx) =>
            week.days.map((day, dayIdx) => (
              <rect
                className={cn(
                  LEVEL_CLASSES[day.level],
                  "cursor-pointer transition-opacity hover:opacity-80",
                )}
                height={CELL_SIZE}
                key={day.date}
                onMouseEnter={(e) => handleCellHover(day, e)}
                onMouseLeave={() => setTooltip(null)}
                rx={2}
                ry={2}
                width={CELL_SIZE}
                x={DAY_LABEL_WIDTH + weekIdx * STEP}
                y={MONTH_LABEL_HEIGHT + dayIdx * STEP}
              />
            )),
          )}
        </svg>
      </div>

      {tooltip ? (
        <Tooltip day={tooltip.day} x={tooltip.x} y={tooltip.y} />
      ) : null}

      <div className="mt-3 flex items-center justify-end gap-1.5">
        <span className="type-mono text-muted-foreground text-[10px]">
          Less
        </span>
        {[0, 1, 2, 3, 4].map((level) => (
          <svg height={CELL_SIZE} key={level} width={CELL_SIZE}>
            <rect
              className={LEVEL_CLASSES[level as 0 | 1 | 2 | 3 | 4]}
              height={CELL_SIZE}
              rx={2}
              ry={2}
              width={CELL_SIZE}
            />
          </svg>
        ))}
        <span className="type-mono text-muted-foreground text-[10px]">
          More
        </span>
      </div>
    </div>
  );
}
