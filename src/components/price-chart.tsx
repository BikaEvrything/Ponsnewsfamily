import * as React from "react";

export function PriceChart({
  values,
  up = true,
  height = 168,
  label = "Session chart",
}: {
  values?: number[];
  up?: boolean;
  height?: number;
  label?: string;
}) {
  const defaultData = up
    ? [100, 108, 105, 115, 112, 128, 122, 140]
    : [140, 122, 128, 112, 115, 105, 108, 100];

  const safeValues =
    Array.isArray(values) && values.length >= 2 ? values : defaultData;

  const min = Math.min(...safeValues);
  const max = Math.max(...safeValues);
  const span = max - min || 1;
  const width = 640;
  const pad = 8;

  const points = safeValues.map((value, index) => {
    const x = pad + (index / (safeValues.length - 1)) * (width - pad * 2);
    const y = pad + (1 - (value - min) / span) * (height - pad * 2);
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });

  const lastX = width - pad;
  const fill = `${points.join(" ")} ${lastX},${height - pad} ${pad},${height - pad}`;
  const stroke = up ? "#22c55e" : "#ef4444";
  const tint = up ? "rgba(34, 197, 94, 0.15)" : "rgba(239, 68, 68, 0.15)";

  return (
    <figure
      className="w-full overflow-hidden rounded-[14px] border border-gray-200/50 bg-black/5 p-1 dark:bg-white/5 block"
      style={{ minHeight: `${height}px` }}
    >
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="block w-full"
        style={{ height: `${height}px` }}
        role="img"
        aria-label={label}
      >
        <polygon points={fill} fill={tint} />
        <polyline
          points={points.join(" ")}
          fill="none"
          stroke={stroke}
          strokeWidth="3"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </svg>
    </figure>
  );
}