import * as React from "react";

export function PriceChart({
  values = [100, 120, 115, 135, 130, 150, 145, 160],
  up = true,
  height = 168,
  label = "Session chart",
}: {
  values?: number[];
  up?: boolean;
  height?: number;
  label?: string;
}) {
  const safeValues =
    Array.isArray(values) && values.length >= 2
      ? values
      : [100, 120, 115, 135, 130, 150, 145, 160];

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
    <figure className="w-full overflow-hidden rounded-[20px] border border-gray-200 bg-white p-2">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="block h-auto w-full"
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