export function PriceChart({
  values,
  up = true,
  height = 168,
  label = "Session chart",
}: {
  values: number[];
  up?: boolean;
  height?: number;
  label?: string;
}) {
  const series = values.length >= 2 ? values : [100, 100];
  const min = Math.min(...series);
  const max = Math.max(...series);
  const span = max - min || 1;
  const width = 640;
  const pad = 8;
  const points = series.map((value, index) => {
    const x = pad + (index / (series.length - 1)) * (width - pad * 2);
    const y = pad + (1 - (value - min) / span) * (height - pad * 2);
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });
  const lastX = width - pad;
  const lastY = pad + (1 - (series[series.length - 1] - min) / span) * (height - pad * 2);
  const fill = `${points.join(" ")} ${lastX},${height - pad} ${pad},${height - pad}`;
  const stroke = up ? "#2f6b4f" : "#8a5a1d";
  const tint = up ? "rgba(47,107,79,0.14)" : "rgba(138,90,29,0.14)";

  return (
    <figure className="overflow-hidden rounded-[20px] border border-line bg-paper">
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
