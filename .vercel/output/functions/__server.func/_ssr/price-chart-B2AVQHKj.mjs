import "../_runtime.mjs";
import { B as require_react, y as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
require_react();
var import_jsx_runtime = require_jsx_runtime();
function PriceChart({ values = [
	100,
	120,
	115,
	135,
	130,
	150,
	145,
	160
], up = true, height = 168, label = "Session chart" }) {
	const safeValues = Array.isArray(values) && values.length >= 2 ? values : [
		100,
		120,
		115,
		135,
		130,
		150,
		145,
		160
	];
	const min = Math.min(...safeValues);
	const span = Math.max(...safeValues) - min || 1;
	const width = 640;
	const pad = 8;
	const points = safeValues.map((value, index) => {
		const x = pad + index / (safeValues.length - 1) * 624;
		const y = pad + (1 - (value - min) / span) * (height - 16);
		return `${x.toFixed(1)},${y.toFixed(1)}`;
	});
	const fill = `${points.join(" ")} 632,${height - pad} ${pad},${height - pad}`;
	const stroke = up ? "#22c55e" : "#ef4444";
	const tint = up ? "rgba(34, 197, 94, 0.15)" : "rgba(239, 68, 68, 0.15)";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("figure", {
		className: "w-full overflow-hidden rounded-[20px] border border-gray-200 bg-white p-2",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			viewBox: `0 0 ${width} ${height}`,
			className: "block h-auto w-full",
			role: "img",
			"aria-label": label,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
				points: fill,
				fill: tint
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("polyline", {
				points: points.join(" "),
				fill: "none",
				stroke,
				strokeWidth: "3",
				strokeLinejoin: "round",
				strokeLinecap: "round"
			})]
		})
	});
}
//#endregion
export { PriceChart as t };
