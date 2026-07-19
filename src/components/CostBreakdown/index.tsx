import { useState } from "react";
import type { SimulationData } from "../../types";
import { useFinancingCalculation } from "../../hooks/useFinancingCalculation";

interface CostBreakdownProps {
  latestSimulation: SimulationData | null;
}

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

/* ── SVG donut helpers ─────────────────────────────────── */
const RADIUS = 80;
const STROKE_WIDTH = 24;
const CENTER = RADIUS + STROKE_WIDTH / 2;
const VIEWBOX_SIZE = CENTER * 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

/** Converts a 0-1 ratio into an SVG arc path (for the donut ring). */
function arcSegment(
  startRatio: number,
  endRatio: number,
): { dashArray: string; dashOffset: number } {
  const length = (endRatio - startRatio) * CIRCUMFERENCE;
  const offset = -startRatio * CIRCUMFERENCE;
  return {
    dashArray: `${length} ${CIRCUMFERENCE - length}`,
    dashOffset: offset,
  };
}

/* ── Component ─────────────────────────────────────────── */
export const CostBreakdown = ({ latestSimulation }: CostBreakdownProps) => {
  const { totalPayable, totalInterest, installments, financedAmount } =
    useFinancingCalculation(latestSimulation);

  const [hoveredSegment, setHoveredSegment] = useState<
    "principal" | "interest" | null
  >(null);

  // Ratios for the two donut segments
  const principalRatio = totalPayable > 0 ? financedAmount / totalPayable : 1;
  const interestRatio = totalPayable > 0 ? totalInterest / totalPayable : 0;

  const principalArc = arcSegment(0, principalRatio);
  const interestArc = arcSegment(
    principalRatio,
    principalRatio + interestRatio,
  );

  // What to show in the centre of the donut
  const centreLabel =
    hoveredSegment === "principal"
      ? {
          title: "Financiamento",
          value: currencyFormatter.format(financedAmount),
        }
      : hoveredSegment === "interest"
        ? { title: "Juros", value: currencyFormatter.format(totalInterest) }
        : { title: "Total", value: currencyFormatter.format(totalPayable) };

  return (
    <div className="w-full border-none rounded-2xl shadow-2xl bg-white grid grid-cols-1 lg:grid-cols-2">
      {/* Cost Wheel Section */}
      <div className="flex flex-col items-start gap-3 sm:gap-4 p-4 sm:p-6">
        <p className="text-blue-950 font-bold text-lg sm:text-xl">
          RODA DE CUSTOS
        </p>

        {/* Interactive donut chart */}
        <div
          id="wheel-of-costs"
          className="flex flex-col items-center justify-center w-full"
        >
          <svg
            viewBox={`0 0 ${VIEWBOX_SIZE} ${VIEWBOX_SIZE}`}
            className="w-48 h-48 sm:w-56 sm:h-56"
          >
            {/* Background ring (light grey when there's no data) */}
            <circle
              cx={CENTER}
              cy={CENTER}
              r={RADIUS}
              fill="none"
              stroke="#e2e8f0"
              strokeWidth={STROKE_WIDTH}
            />

            {/* Principal segment — blue-800 (#1e40af) */}
            <circle
              cx={CENTER}
              cy={CENTER}
              r={RADIUS}
              fill="none"
              stroke="#1e40af"
              strokeWidth={STROKE_WIDTH}
              strokeDasharray={principalArc.dashArray}
              strokeDashoffset={principalArc.dashOffset}
              strokeLinecap="butt"
              transform={`rotate(-90 ${CENTER} ${CENTER})`}
              className="transition-all duration-500 ease-out cursor-pointer"
              style={{
                opacity: hoveredSegment === "interest" ? 0.45 : 1,
              }}
              onMouseEnter={() => setHoveredSegment("principal")}
              onMouseLeave={() => setHoveredSegment(null)}
            />

            {/* Interest segment — emerald-600 (#059669) */}
            <circle
              cx={CENTER}
              cy={CENTER}
              r={RADIUS}
              fill="none"
              stroke="#059669"
              strokeWidth={STROKE_WIDTH}
              strokeDasharray={interestArc.dashArray}
              strokeDashoffset={interestArc.dashOffset}
              strokeLinecap="butt"
              transform={`rotate(-90 ${CENTER} ${CENTER})`}
              className="transition-all duration-500 ease-out cursor-pointer"
              style={{
                opacity: hoveredSegment === "principal" ? 0.45 : 1,
              }}
              onMouseEnter={() => setHoveredSegment("interest")}
              onMouseLeave={() => setHoveredSegment(null)}
            />

            {/* Centre label */}
            <text
              x={CENTER}
              y={CENTER - 6}
              textAnchor="middle"
              dominantBaseline="auto"
              className="fill-slate-500 text-[10px] font-medium"
            >
              {centreLabel.title}
            </text>
            <text
              x={CENTER}
              y={CENTER + 10}
              textAnchor="middle"
              dominantBaseline="auto"
              className="fill-blue-950 text-[11px] font-bold"
            >
              {centreLabel.value}
            </text>
          </svg>

          {/* Legend */}
          <div className="flex items-center gap-4 mt-2">
            <div
              className="flex items-center gap-1.5 cursor-pointer"
              onMouseEnter={() => setHoveredSegment("principal")}
              onMouseLeave={() => setHoveredSegment(null)}
            >
              <span className="inline-block w-3 h-3 rounded-full bg-blue-800" />
              <span className="text-xs text-slate-600">Financiamento</span>
            </div>
            <div
              className="flex items-center gap-1.5 cursor-pointer"
              onMouseEnter={() => setHoveredSegment("interest")}
              onMouseLeave={() => setHoveredSegment(null)}
            >
              <span className="inline-block w-3 h-3 rounded-full bg-emerald-600" />
              <span className="text-xs text-slate-600">Juros</span>
            </div>
          </div>
        </div>

        <div className="w-full space-y-1">
          <div className="flex flex-wrap justify-between sm:justify-start gap-2 sm:gap-6">
            <p className="text-sm sm:text-base text-slate-600">
              Total a pagar:
            </p>
            <p className="text-sm sm:text-base font-semibold text-blue-950">
              {currencyFormatter.format(totalPayable)}
            </p>
          </div>
          <div className="flex flex-wrap justify-between sm:justify-start gap-2 sm:gap-6">
            <p className="text-sm sm:text-base text-slate-600">
              Total de juros:
            </p>
            <p className="text-sm sm:text-base font-semibold text-blue-950">
              {currencyFormatter.format(totalInterest)}
            </p>
          </div>
        </div>
      </div>

      {/* Divider — visible only on mobile (stacked layout) */}
      <div
        className="block lg:hidden mx-4 border-t border-slate-200"
        aria-hidden="true"
      />

      {/* Plan Summary Section */}
      <div className="flex flex-col items-start gap-3 sm:gap-4 p-4 sm:p-6">
        <p className="text-blue-950 font-bold text-lg sm:text-xl">
          RESUMO DO PLANO
        </p>
        <div className="w-full space-y-1">
          <div className="flex flex-wrap justify-between sm:justify-start gap-2 sm:gap-6">
            <p className="text-sm sm:text-base text-slate-600">Parcelas:</p>
            <p className="text-sm sm:text-base font-semibold text-blue-950">
              {installments}x
            </p>
          </div>
          <div className="flex flex-wrap justify-between sm:justify-start gap-2 sm:gap-6">
            <p className="text-sm sm:text-base text-slate-600">
              Total do financiamento:
            </p>
            <p className="text-sm sm:text-base font-semibold text-blue-950">
              {currencyFormatter.format(financedAmount)}
            </p>
          </div>
          <div className="flex flex-wrap justify-between sm:justify-start gap-2 sm:gap-6">
            <p className="text-sm sm:text-base text-slate-600">
              Valor total pago:
            </p>
            <p className="text-sm sm:text-base font-semibold text-blue-950">
              {currencyFormatter.format(totalPayable)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
