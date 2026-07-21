import type { SimulationData } from "../../types";
import { useFinancingCalculation } from "../../hooks/useFinancingCalculation";
import { DonutChart } from "./DonutChart";
import { PlanSummary } from "./PlanSummary";

interface CostBreakdownProps {
  latestSimulation: SimulationData | null;
}

/* ── Component ─────────────────────────────────────────── */
export const CostBreakdown = ({ latestSimulation }: CostBreakdownProps) => {
  const { totalPayable, totalInterest, installments, financedAmount } =
    useFinancingCalculation(latestSimulation);

  return (
    <div className="w-full border-none rounded-2xl shadow-2xl bg-white grid grid-cols-1 lg:grid-cols-2">
      {/* Cost Wheel Section */}
      <DonutChart
        financedAmount={financedAmount}
        totalInterest={totalInterest}
        totalPayable={totalPayable}
      />

      {/* Divider — visible only on mobile (stacked layout) */}
      <div
        className="block lg:hidden mx-4 border-t border-slate-200"
        aria-hidden="true"
      />

      {/* Plan Summary Section */}
      <PlanSummary
        installments={installments}
        financedAmount={financedAmount}
        totalPayable={totalPayable}
      />
    </div>
  );
};
